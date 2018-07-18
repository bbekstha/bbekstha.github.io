// Defining components required
const home = {
	template: `
	<div id='ogB'>
	<button class='button' @click='stockClick'> Stock </button>
	<button class='button' @click='repoClick'> Repo </button>
	<button class='button' @click='protectedClick'> Proteted </button>
	<button class='button' @click='prsnSearchClick'> Person </button>
	</div>
	`,
	methods: {
		stockClick: function() {
			console.log("Stock clicked")
			this.$router.push('/stock')
			this.$emit('stock-click', 'stock')
		},
		repoClick: function() {
			console.log("Repo Clicked")
			this.$router.push('/repo')
			this.$emit('repo-click', 'repo')
		},
		protectedClick: function() {
			console.log("Protected clicked")
			this.$router.push('/protected')
			this.$emit('protected-click', 'protected')
			protectedContent()
		},
		prsnSearchClick: function() {
			console.log("Person clicked")
			this.$router.push('/personSearch')
			this.$emit('prsn-search-click', 'search-person')
		}
	}
}

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
	<button class='button' @click='goHome'> Go Home </button>
	</div>
	`,
	methods: {
		searchStock: function() {
			searchFunction(this.stockSymbol)
		},
		goHome: function() {
			console.log("Going home")
			this.$router.push('/')
			this.$emit('go-home', 'home')
		}
	}
}

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
			<button class='button' @click='goHome'> Go Home </button>
		</div>`,
	methods: {
		displayRepos: function(){
			accessFunction(this.accessToken)
		},
		goHome: function() {
			console.log("Going home")
			this.$router.push('/')
			this.$emit('go-home', 'home')
		}
	}
}

const searchPerson = {
	data: function() {
		return {
			searchParam: ''
		}
	},
	template: `
		<div id='contentItems'>
			<input type='text' id="Input" @keyup.enter='personSearch' v-model='searchParam'>
			<button class='button' @click='personSearch'> Search </button>
			<button class='button' @click='goHome'> Go Home </button>
		</div>`,
	methods: {
		displayRepos: function(){
			personSearch(this.searchParam)
		},
		goHome: function() {
			console.log("Going home")
			this.$router.push('/')
			this.$emit('go-home', 'home')
		}
	}
}

const protected = {
	template: `
		<div id='contentItems'>
			<button class='button' @click='goHome'> Go Home </button>
		</div>`,
	methods: {
		goHome: function() {
			console.log("Going home")
			this.$router.push('/')
			this.$emit('go-home', 'home')
		}
	}
}

// Setup for routing
const routes = [
	{ path: '/', component: home },
	{ path: '/stock', component: stock },
	{ path: '/repo', component: repo},
	{ path: '/protected', component: protectedContent},
	{ path: '/personSearch', component: searchPerson}
]

const router = new VueRouter({
	routes
})


new Vue({
	el: "#app",
	router,
	data: {
		currentView : 'home'
	},
	methods: {
		updateView : function(newView) {
			this.currentView = newView
		}
	}
})
