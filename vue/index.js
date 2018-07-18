const home = {
	template: `
   <div id='ogB'>
   	<button class='button' @click='stockClick'> Stock </button>
    <button class='button' @click='repoClick'> Repo </button>
   </div>
  `,
  methods: {
  	stockClick: function() {
    	console.log("Button clicked")
      this.$router.push('/stock')
      this.$emit('stock-click', 'stock')
    },
    repoClick: function() {
    	console.log("Repo Clicked")
      this.$router.push('/repo')
      this.$emit('repo-click', 'repo')
    }
  }
}

const stock = {
  template: `
  	<div id='content'>
  		<input type='text'>
  		<button class='button'> Search stock </button>
    	<button class='button' @click='goHome'> Go Home </button>
    </div>
  `,
  methods: {
  	goHome: function() {
    	console.log("Going home")
      this.$router.push('/')
      this.$emit('go-home', 'home')
    }
  }
}

const repo = {
  template: `
  	<div id='content'>
  		<input type='text'>
  		<button class='button'> Display repos </button>
    	<button class='button' @click='goHome'> Go Home </button>
    </div>
  `,
  methods: {
  	goHome: function() {
    	console.log("Going home")
      this.$router.push('/')
      this.$emit('go-home', 'home')
    }
  }
}

const routes = [
  { path: '/', component: home },
  { path: '/stock', component: stock },
  { path: '/repo', component: repo}
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
