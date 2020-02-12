<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddTask">新建任务</el-button>
    <el-table :data="taskList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="任务编号" width="220">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="项目" width="220">
        <template slot-scope="scope">
          {{ scope.row.project }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="任务名称">
        <template slot-scope="scope">
          {{ scope.row.taskName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="220">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button> -->
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑任务':'新建任务'">
      <el-form :model="task" label-width="80px" label-position="left">
        <el-form-item label="项目">
          <el-input v-model="task.project" placeholder="项目" />
        </el-form-item>
        <el-form-item label="任务名称">
          <el-input v-model="task.taskName" placeholder="任务名称" />
        </el-form-item>
        <!-- <el-form-item label="Desc">
          <el-input
            v-model="role.description"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Role Description"
          />
        </el-form-item> -->
        <!-- <el-form-item label="Menus">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
          />
        </el-form-item> -->
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmTask">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
import { addTask,listTask,deleteTaskById } from '@/api/task'

// const defaultRole = {
//   key: '',
//   name: '',
//   description: '',
//   routes: []
// }

export default {
  data() {
    return {
      taskList:[],//[{id:1,name:'haha'},{id:2,name:'hehe'}],
      task:{},
      // role: Object.assign({}, defaultRole),
      // routes: [],
      // rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      // checkStrictly: false,
      // defaultProps: {
      //   children: 'children',
      //   label: 'title'
      // }
    }
  },
  computed: {
    // routesData() {
    //   return this.routes
    // }
  },
  created() {

   


    listTask().then(response => {
        this.taskList = response.data;
      }).catch(err => {
        console.log(err)
    });
    // Mock: get all routes and roles list from server
    // this.getRoutes()
    // this.getRoles()
  },
  methods: {
    // async getRoutes() {
    //   const res = await getRoutes()
    //   this.serviceRoutes = res.data
    //   this.routes = this.generateRoutes(res.data)
    // },
    // async getRoles() {
    //   const res = await getRoles()
    //   this.rolesList = res.data
    // },

    // // Reshape the routes structure so that it looks the same as the sidebar
    // generateRoutes(routes, basePath = '/') {
    //   const res = []

    //   for (let route of routes) {
    //     // skip some route
    //     if (route.hidden) { continue }

    //     const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

    //     if (route.children && onlyOneShowingChild && !route.alwaysShow) {
    //       route = onlyOneShowingChild
    //     }

    //     const data = {
    //       path: path.resolve(basePath, route.path),
    //       title: route.meta && route.meta.title

    //     }

    //     // recursive child routes
    //     if (route.children) {
    //       data.children = this.generateRoutes(route.children, data.path)
    //     }
    //     res.push(data)
    //   }
    //   return res
    // },
    // generateArr(routes) {
    //   let data = []
    //   routes.forEach(route => {
    //     data.push(route)
    //     if (route.children) {
    //       const temp = this.generateArr(route.children)
    //       if (temp.length > 0) {
    //         data = [...data, ...temp]
    //       }
    //     }
    //   })
    //   return data
    // },
    handleAddTask() {
      // this.role = Object.assign({}, defaultRole)
      // if (this.$refs.tree) {
      //   this.$refs.tree.setCheckedNodes([])
      // }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    // handleEdit(scope) {
    //   this.dialogType = 'edit'
    //   this.dialogVisible = true
    //   this.checkStrictly = true
    //   this.role = deepClone(scope.row)
    //   this.$nextTick(() => {
    //     const routes = this.generateRoutes(this.role.routes)
    //     this.$refs.tree.setCheckedNodes(this.generateArr(routes))
    //     // set checked state of a node not affects its father and child nodes
    //     this.checkStrictly = false
    //   })
    // },
    handleDelete({ $index, row }) {
      this.$confirm('确认删除?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteTaskById(row.id)
          this.taskList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
        .catch(err => { console.error(err) })
    },
    // generateTree(routes, basePath = '/', checkedKeys) {
    //   const res = []

    //   for (const route of routes) {
    //     const routePath = path.resolve(basePath, route.path)

    //     // recursive child routes
    //     if (route.children) {
    //       route.children = this.generateTree(route.children, routePath, checkedKeys)
    //     }

    //     if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
    //       res.push(route)
    //     }
    //   }
    //   return res
    // },
    async confirmTask() {
      const isEdit = this.dialogType === 'edit'

      // const checkedKeys = this.$refs.tree.getCheckedKeys()
      // this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)

      if (isEdit) {
        // await updateRole(this.role.key, this.role)
        // for (let index = 0; index < this.rolesList.length; index++) {
        //   if (this.rolesList[index].key === this.role.key) {
        //     this.rolesList.splice(index, 1, Object.assign({}, this.role))
        //     break
        //   }
        // }
      } else {
        const tempData = Object.assign({}, this.task);
        tempData.id = '';
        const jsonData = (JSON.stringify(tempData));
        addTask(jsonData).then((response) => {
            // this.list.unshift(this.task)
            var new_task = Object.assign({}, this.task);
            new_task.id = response.data;
            new_task.status = 0;
            this.taskList.push(new_task);
            this.task = {};
        })
        
      }

      // const { description, id, name } = this.role
      this.dialogVisible = false
      // this.$notify({
      //   title: 'Success',
      //   dangerouslyUseHTMLString: true,
      //   message: `
      //       <div>任务编号: ${id}</div>
      //       <div>Role Name: ${name}</div>
      //       <div>Description: ${description}</div>
      //     `,
      //   type: 'success'
      // })
    },
    // // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    // onlyOneShowingChild(children = [], parent) {
    //   let onlyOneChild = null
    //   const showingChildren = children.filter(item => !item.hidden)

    //   // When there is only one child route, the child route is displayed by default
    //   if (showingChildren.length === 1) {
    //     onlyOneChild = showingChildren[0]
    //     onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
    //     return onlyOneChild
    //   }

    //   // Show parent if there are no child route to display
    //   if (showingChildren.length === 0) {
    //     onlyOneChild = { ... parent, path: '', noShowingChildren: true }
    //     return onlyOneChild
    //   }

    //   return false
    // }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
