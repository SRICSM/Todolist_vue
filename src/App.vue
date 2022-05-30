<template>
  <div id="root">
    <!--给MyHeader绑定addTodo自定义事件，事件函数名为addTodo-->
    <MyHeader @addTodo="addTodo"/>
    <!--将todos传给ListDoing组件，渲染到页面上-->
    <ListDoing :todos="todos"/>
    <!--将todos传给ListDone组件，渲染到页面上-->
    <!--给组件绑定自定义事件，利用vue.$emit定义事件传参-->
    <ListDone :todos="todos" @checkAllTodo="checkAllTodo" :cleanAllTodo="cleanAllTodo"/>
    <MyFooter/>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
import MyHeader from "@/components/MyHeader";
import MyFooter from "@/components/MyFooter";
import ListDoing from "@/components/ListDoing";
import ListDone from "@/components/ListDone";

export default {
  name: 'App',
  components: {
    MyHeader,
    ListDoing,
    ListDone,
    MyFooter
  },
  data() {
    return {
      // 从本地存储里面取出todos，如果还没有todos，将todos赋初始值为空数组
      todos: JSON.parse(localStorage.getItem('todos')) || []
    }
  },
  watch: {
    // 监视todos数组的变化，将新数据转为JSON格式存入本地存储
    todos: {
      // 开启深度监视可以检测  todo里面的  todoObj里面的数据变化，从而更新本地存储里面的数据
      deep: true,
      handler(value) {
        localStorage.setItem('todos', JSON.stringify(value))
      }
    }
  },
  methods: {
    // 将todoObj对象添加到todos数组里面
    addTodo(todoObj) {
      this.todos.unshift(todoObj)
      // console.log(this.todos)
    },
    //勾选状态的改变
    checkTodo(id) {
      //遍历todos数组，找到需要改变状态的id
      this.todos.forEach(todo => {
        if (todo.id === id) todo.done = !todo.done
      })
    },
    // 删除一个todo 可以用数组过滤的方式   返回的id是要删除的id 过滤出不是返回的id的数据
    // filter不改变原数组，要对原数组重新赋值     (消息订阅与发布至少有两个参数，消息名和接收过来的数据)
    deleteTodo(_, id) {
      //如果利用pusub，参数需要一个 _ 参数占位
      this.todos = this.todos.filter(todo => {
        //该id是要删除的todo，对其取反 留下的就是不删除的todo
        return todo.id !== id
      })
    },
    //更新一个todo
    updateTodo(id, title) {
      this.todos.forEach(todo => {
        if (todo.id === id) todo.title = title
      })
    },
    //全选或者取消全选
    checkAllTodo(isAll) {
      //将todos里面的todo.done的状态修改成和checked一致
      this.todos.forEach(todo => {
        todo.done = isAll
      })
    },
    //清除所有的todo
    cleanAllTodo() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done
      })
    }
  },
  mounted() {
    // 绑定全局事件总线  前一个参数：事件名   后一个参数：事件触发的回调函数(不用写参数，写回调函数名即可）
    this.$bus.$on('checkTodo', this.checkTodo)
    this.$bus.$on('updateTodo', this.updateTodo)
    // 要获取数据的人订阅消息  消息名
    this.pubId = pubsub.subscribe('deleteTodo', this.deleteTodo)
    // this.$bus.$on('deleteTodo', this.deleteTodo)
  },
  beforeDestroy() {
    // 解绑事件
    this.$bus.$off('checkTodo', this.checkTodo)
    this.$bus.$off('updateTodo', this.updateTodo)
    this.$bus.$off('deleteTodo', this.deleteTodo)
    pubsub.unsubscribe(this.pubId)
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-size: 16px;
  background: #CDCDCD;
}

ol,
ul {
  padding: 0;
  list-style: none;
}

section {
  margin: 0 auto;
}

/*按钮部分*/
.btn {
  display: inline-block;
  float: right;
  padding: 4px 12px;
  margin: 3px 0;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.cleanbtn {
  font-size: 17px;
  line-height: 22px;
  color: #FFFFFF;
  background-color: #629A9C;
  border: 1px solid #629A9C;
}

/*针对不同的屏幕展示不同的宽度*/
@media screen and (max-device-width: 620px) {
  section {
    width: 96%;
    padding: 0 2%;
  }
}

@media screen and (min-width: 620px) {
  section {
    width: 600px;
    padding: 0 10px;
  }
}
</style>
