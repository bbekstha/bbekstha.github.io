// Defining components required \\
// Component definition includes:
// 	- template: component elements and rendering
// 	- methods: component methods used by the elements such as button
// 		and other helper methods

// home(root) component definition
const home = {
	template: `
	<div id='ogB'>
	<button class='button' @click='stockClick'> Stock </button>
	<button class='button' @click='repoClick'> Repo </button>
	<button class='button' @click='protectedClick'> Protected </button>
	<button class='button' @click='prsnSearchClick'> Person </button>
	</div>
	`,
	methods: {
		stockClick: function() {
			console.log("Stock clicked")
			this.$router.push('/stock')
			// this.$emit('stock-click', 'stock')
		},
		repoClick: function() {
			console.log("Repo Clicked")
			this.$router.push('/repo')
			// this.$emit('repo-click', 'repo')
		},
		protectedClick: function() {
			console.log("Protected clicked")
			this.$router.push('/protected')
			// if(getCookie('id_token')){
			// 	this.$router.push('/protected')
			// 	// this.$emit('protected-click', 'protectedCont')
			// } else {
			// 	authenticate()
			// }

		},
		prsnSearchClick: function() {
			console.log("Person clicked")
			this.$router.push('/personSearch')
			// this.$emit('prsn-search-click', 'searchPerson')
		}
	}
}

// stock component definition
// data:
// 	- stockSymbol: variable bounded to the input text value
const stock = {
	data: function() {
		return {
			stockSymbol: ''
		}
	},
	template: `
	<div id='contentItems'>
	<input type='text' id="Input" @keyup.enter='searchStock' v-model='stockSymbol'>
	<button class='button' @click='searchStock'> Search stock </button>
	<button id='homeBtn' class='button' @click='goHome'> Go Home </button>
	</div>
	`,
	methods: {
		searchStock: function() {
			searchFunction(this.stockSymbol)
		},
		goHome: function() {
			console.log("Going home")
			this.$router.push('/')
			// this.$emit('go-home', 'home')
		}
	}
}

// repo component definition
// data:
// 	- accessToken: variable bounded to the input text value
const repo = {
	data: function() {
		return {
			accessToken: ''
		}
	},
	template: `
		<div id='contentItems'>
			<input type='text' id="Input" @keyup.enter='displayRepos' v-model='accessToken'>
			<button class='button' @click='displayRepos'> Display repos </button>
			<button id='homeBtn' class='button' @click='goHome'> Go Home </button>
		</div>`,
	methods: {
		displayRepos: function(){
			accessFunction(this.accessToken)
		},
		goHome: function() {
			console.log("Going home")
			this.$router.push('/')
			// this.$emit('go-home', 'home')
		}
	}
}

// search-person component definition
// data:
// 	-searchParam: variable bounded to the input text value
const searchPerson = {
	data: function() {
		return {
			searchParam: ''
		}
	},
	template: `
		<div id='contentItems'>
			<input type='text' id="Input" @keyup.enter='findPerson' v-model='searchParam'>
			<button class='button' @click='findPerson'> Search </button>
			<button id='homeBtn' class='button' @click='goHome'> Go Home </button>
		</div>`,
	methods: {
		findPerson: function(){
			personSearch(this.searchParam)
		},
		goHome: function() {
			console.log("Going home")
			this.$router.push('/')
			// this.$emit('go-home', 'home')
		}
	}
}

// protected-cont component definition
const protectedCont = {
	template: `
		<div id='contentItems'>
			<button id='homeBtn' class='button' @click='goHome'> Go Home </button>
		</div>`,
	methods: {
		goHome: function() {
			console.log("Going home")
			this.$router.push('/')
			// this.$emit('go-home', 'home')
		}
	},
	mounted: protectedContent
}

// Setup for routing
// All routes and their respective components
const routes = [
	{ path: '/', component: home },
	{ path: '/stock', component: stock },
	{ path: '/repo', component: repo},
	{ path: '/protected', component: protectedCont, meta: { requiresAuth: true }},
	{ path: '/personSearch', component: searchPerson}
]
// Creating instance of the router with the routes defined above
const router = new VueRouter({
	routes
})


router.beforeEach((to, from, next) => {
	if(to.meta.requiresAuth) {
		let auth = getCookie('id_token')
		if(auth) {
			next()
		} else {
			authenticate()
		}
	}
})

// Root vue instance
// router: vue router instance to manage deeplinks
// data:
// 	- currentView: variable keeping track of the current component
// 		used by component element in 'index.html'
// 		to dynamically render the componet specified
// methods:
// 	- updateView:
// 		- handles the navigating through dynamic rendering of the components
// 		- updated based on the 'currentView' property
// mounted function - function to retrieve authoriztion token
// 	for the protected content
new Vue({
	el: "#app",
	router,
	// data: {
	// 	currentView : 'home'
	// },
	// methods: {
	// 	updateView : function(newView) {
	// 		this.currentView = newView
	// 	}
	// },
	mounted: function(){
		let keyUrl = location.hash.substring(1);
		if (keyUrl.includes("id_token")){
			var id_tokenVal = keyUrl.substring("id_token=".length, keyUrl.indexOf("&"))
			var exprIndex = keyUrl.indexOf("expires_in") + "expires_in=".length
			var exprVal = keyUrl.substring(exprIndex, keyUrl.indexOf("&", exprIndex))

			console.log("expiration time : ", exprVal);

			setCookie("id_token", id_tokenVal, exprVal);
			window.location = window.location.origin
		}
	}
})
