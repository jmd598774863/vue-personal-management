<template>
  <div class="dashboard-container">
    <span :key="o.id" v-for="o in task_type_list"
      v-bind:style="{color:o.color}" class="type">
      <router-link :to="'/type'+o.id">
      {{ o.name }}
      </router-link>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetchList } from '@/api/task-type'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      task_type_list:'',
    }
  },
  methods: {
    test() {
     
    },
    //@click="toDetail(o.id)" 
    // toDetail(id){
    //   console.log(id)
    // }
  },
  created: function () {
    fetchList().then(response => {
        this.task_type_list = response.data;
      }).catch(err => {
        console.log(err)
    });
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.type{
  height:200px;
  width:300px;
  display:inline-block;
  border:solid 1px black;
  font-size:40px;
  padding:50px;
}
</style>
