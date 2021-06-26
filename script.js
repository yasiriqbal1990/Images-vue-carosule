Vue.component("embla", {
  props: { options: Object },
  template: "#tpl__embla",
  
  methods: {
    init() {
      this.$embla = EmblaCarousel(this.$el, this.options);
    },
    
    api() {
      return this.$embla;
    }
  },
  
  mounted() {
    this.init();
  },
});

Vue.component("carousel", {
  props: { movies: Object, options: Object, current: Number },
  template: "#tpl__carousel",
  
  methods: {
    setCurrent() {
      this.$emit('set-current', this.$refs.embla.api().selectedScrollSnap());
    },
    
    setScrollDirection() {
      if (this.$refs.embla.api().selectedScrollSnap() > this.$refs.embla.api().previousScrollSnap()) {                
       return this.$emit('scroll-direction', 'scroll-next');
      }
      
      this.$emit('scroll-direction', 'scroll-prev');
    },
    
    scrollTo(target) {
      this.$refs.embla.api().scrollTo(target);
    },
    
    scrollPrev() {
      this.$refs.embla.api().scrollPrev();
    },
    
    scrollNext() {
      this.$refs.embla.api().scrollNext();
    },
    
    canScrollPrev() {
      return this.$refs.embla ? this.$refs.embla.api().canScrollPrev() : false;
    },
    
    canScrollNext() {
      return this.$refs.embla ? this.$refs.embla.api().canScrollNext() : true;
    },
    
    handleUpdate() {
      this.setCurrent();
      this.setScrollDirection();
    },
  },
  
  mounted() {
    this.$refs.embla.api().on('select', this.handleUpdate);
  }
});

Vue.component("carousel-item", {
  props: { title: String },
  template: "#tpl__carousel-item",
  
  methods: {
    handleModal() {
      this.$emit('trigger-modal');
    }
  }
});


Vue.component("carousel-image", {
  props: { backdrop: String, size: String },
  template: "#tpl__carousel-image",
  
  computed: {
    src() {
      return `images/${this.backdrop}`;
    }
  }
});

Vue.component("modal", {
  props: { id: Number },
  template: "#tpl__modal",
  
  data() {
    return {
      src: null
    }
  },
  
  methods: {
    fetchVideo() {
      fetch(`https://api.themoviedb.org/3/movie/${this.id}/videos?api_key=${userKey}&language=en-US`)
        .then(res => res.json())
        .then(data => {
          setTimeout(() => {
            this.src = `https://www.youtube.com/embed/${data.results[0].key}?autoplay=1&mute=1`;
          }, 400);
        })
        .catch(err => err);
    },
    
    handleModal() {
      this.$emit('trigger-modal');
    }
  },
  
  mounted() {
    this.fetchVideo();
  }
});

const app = new Vue({
  el: "#app",
  
  data: {
    carouselOptions: { speed: 25 },
    current: 0,
    movies: [],
    scrollDirection: null,
    showModal: false,
    loading: false,
    error: false
  },
  
  methods: {
    handleScrollDirection(value) {
      this.scrollDirection = value;
    },
    
    handleCurrentSlide(value) {
      this.current = value;
    },
    
    handleModal() {
      this.showModal = !this.showModal;
    },
    
    fetchMovieList() { 
      this.loading = false;
      // fetch(`https://api.themoviedb.org/3/list/142235?api_key=${userKey}&language=en-US`)
      //   .then(res => res.json())
      //   .then(data => this.movies = data.items)
      //   .then(data=>console.log(data))
      //   .then(this.loading = false)
      //   .catch(err => this.error);

      this.movies = [
                     {'id':1,'title':'future house 1', 'img':'future-house-1.png'},
                     {'id':2,'title':'future house 2', 'img':'future-house-2.jpg'},
                     {'id':3,'title':'future house 3', 'img':'future-house-3.jpg'},
                     {'id':4,'title':'future house 4', 'img':'future-house-4.jpg'},
                     {'id':5,'title':'future house 5', 'img':'future-house-5.jpg'},
                     {'id':6,'title':'future house 6', 'img':'future-house-6.jpg'},
                     {'id':7,'title':'future house 7', 'img':'future-house-7.jpg'},
                     {'id':8,'title':'future house 8', 'img':'future-house-8.jpg'},
                     {'id':9,'title':'future house 9', 'img':'future-house-9.jpg'},
                     {'id':10,'title':'future house 10', 'img':'future-house-10.jpg'},
                     {'id':11,'title':'future house 11', 'img':'future-house-11.jpg'},
                     {'id':12,'title':'future house 12', 'img':'future-house-12.jpg'},
                     {'id':13,'title':'future house 13', 'img':'future-house-13.jpg'},
                     {'id':14,'title':'future house 14', 'img':'future-house-14.jpg'},
                     {'id':15,'title':'future house 15', 'img':'future-house-15.jpg'},
                     {'id':16,'title':'future house 16', 'img':'future-house-16.jpg'},
                     {'id':17,'title':'future house 17', 'img':'future-house-17.jpg'},
                     {'id':18,'title':'future house 18', 'img':'future-house-18.jpg'},
                     {'id':19,'title':'future house 19', 'img':'future-house-19.jpg'},
                     {'id':20,'title':'future house 20', 'img':'future-house-20.jpg'},
                     {'id':21,'title':'future house 21', 'img':'future-house-21.jpg'},
                     {'id':22,'title':'future house 22', 'img':'future-house-22.jpg'},
                     {'id':23,'title':'future house 23', 'img':'future-house-23.jpg'},
                     {'id':24,'title':'future house 24', 'img':'future-house-24.jpg'},
                             ];                console.log(this.movies);
    },
    
  },
  
  created() {
    this.fetchMovieList();
  }
});