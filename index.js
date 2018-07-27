// Defining components required \\
// Component definition includes:
// 	- template: component elements and rendering
// 	- methods: component methods used by the elements such as button
// 		and other helper methods

// home(root) component definition
const home = {
	data: function() {
		return {
			authenticated: false
		}
	},
	template: `
	<div>
		<button class='button' v-show='authenticated'> Logout</button>
		<div id='ogB'>
			<div id='authenticate' v-show='!authenticated'>
				<button class='button' @click='loginClick'> Login </button>
			</div>
			<button class='button' @click='stockClick'> Search Stock </button>
			<button class='button' @click='repoClick'> Display Repos </button>
			<button class='button' @click='prsnSearchClick'> Search Person </button>
			<div id='authRequired' v-show='authenticated'>
				<button class='button' @click='protectedClick'> Display Pets </button>
				<button class='button'> Personal Info </button>
				<button class='button'> Money Matters </button>
				<button class='button'> Academics </button>
				<button class='button'> ASI </button>
			</div>
		</div>
	</div>
	`,
	methods: {
		loginClick: function() {
			console.log("Login clicked")
			authenticate()
		},
		stockClick: function() {
			console.log("Stock clicked")
			this.$router.push('/stock')
		},
		repoClick: function() {
			console.log("Repo Clicked")
			this.$router.push('/repo')
		},
		protectedClick: function() {
			console.log("Protected clicked")
			this.$router.push('/protected')

		},
		prsnSearchClick: function() {
			console.log("Person clicked")
			this.$router.push('/personSearch')
		}
	},
	mounted: function() {
		this.authenticated = getCookie("id_token") != ""
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

// For each route check if authentication is required
// If route requires authentication and is not authenticated
// direct to aws cognito for authentication
// If authenticated, proceed with the routing
router.beforeEach((to, from, next) => {
	if(to.meta.requiresAuth) {
		let auth = getCookie('id_token')
		if(auth &&
       (new Date(auth.expDate) - (29.5 * 60 * 1000) - new Date())/60000 > 30) {
			console.log("HERE")
			next()
		} else {
			authenticate()
		}
	} else {
		next()
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
// mounted function - function to retrieve authorization token
// 	for the protected content
new Vue({
	el: "#app",
	router,
	mounted: function(){
		let keyUrl = location.hash.substring(1) + "&";
		if (keyUrl.includes("id_token")){
         var id_tokenIndex = keyUrl.indexOf("id_token=")
         var id_tokenVal = keyUrl.substring(id_tokenIndex + "id_token=".length,
          keyUrl.indexOf("&", id_tokenIndex))
         var exprIndex = keyUrl.indexOf("expires_in") + "expires_in=".length
         var exprVal = keyUrl.substring(exprIndex,
          keyUrl.indexOf("&", exprIndex))

         setCookie("id_token", id_tokenVal, exprVal);
         window.location = window.location.origin
      }
	}
})
