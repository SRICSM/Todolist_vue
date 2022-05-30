<template>

<!--  这里的name="todo"，对应style里面的.todo-enter-active-->
<!--  若有多个元素需要过度，则需要使用：<transition-group>，且每个元素都要指定key值。-->
  <transition name="todo" , appear>
    <li>
      <input type="checkbox" :checked="todo.done" @click="handleCheck(todo.id)">
      <p>
        <span>{{ todo.title }}</span>
        <!--编辑输入框，不编辑的时候隐藏 失去焦点的时候退出编辑-->
        <input
            type="text"
            v-show="todo.isEdit"
            :value="todo.title"
            @blur="handleBlur(todo,$event)"
            ref="inputTitle"
        >
      </p>
      <!-- 编辑按钮-->
      <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
      <button class="btn btn-edit" @click="handleEdit(todo)" v-show="!todo.isEdit">编辑</button>
    </li>
  </transition>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
  name: "MyItem",
  // 接收从父组件MyList传过来的对象数据
  props: ['todo'],
  // 利用全局事件总线的时候记得写$bus
  methods: {
    // 改变当前勾选的状态，将勾选状态传给App，修改todos.done
    handleCheck(id) {
      //把要改变勾选状态的id传给App，改变对应的数据
      this.$bus.$emit('checkTodo', id)
    },
    //删除todo
    handleDelete(id) {
      if (confirm('确定要删除吗？')) {
        //利用全局事件总线通信
        // this.$bus.$emit('deleteTodo', id)

        // 发布消息  参数1：消息名   参数2：数据
        pubsub.publish('deleteTodo', id)
      }
    },
    //编辑todo
    handleEdit(todo) {
      // 给todo添加isEdit属性，并且利用$set，让数据变成响应式
      //  hasOwnProperty：判断一个对象上是否有某个属性
      // eslint-disable-next-line no-prototype-builtins
      if (todo.hasOwnProperty('isEdit')) {
        todo.isEdit = true
      } else {
        this.$set(todo, 'isEdit', true)
      }
      // 编辑的时候获取焦点
      // 在下一次 DOM 更新结束后执行其指定的回调
      // 当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。
      this.$nextTick(function () {
        this.$refs.inputTitle.focus()
      })
    },
    handleBlur(todo, e) {
      todo.isEdit = false
      if (!e.target.value.trim()) return alert('输入不能为空!')
      this.$bus.$emit('updateTodo', todo.id, e.target.value)
    }
  }
}
</script>

<style scoped>
.btn-danger {
  color: #333;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn-edit {
  color: #333;
  background-color: skyblue;
  border: 1px solid deepskyblue;
  margin-right: 5px;
}

.btn-edit:hover {
  color: #fff;
  background-color: #629Aaf;
}

.btn:focus {
  outline: none;
}

/*因为ListDone和ListDoing里面都有li ，公共样式写在app里面*/
h2 {
  position: relative;
}

span {
  position: absolute;
  padding: 0 5px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #000;
  font-size: 18px;
}
li button {
  display: none;
}
li:hover {
  background-color: #eee;
}
li:hover button {
  display: block;
}
li input {
  position: absolute;
  top: 2px;
  left: 10px;
  width: 22px;
  height: 22px;
  cursor: pointer;
}

p {
  margin: 0;
}

li p input {
  top: 3px;
  left: 40px;
  width: 70%;
  height: 20px;
  line-height: 14px;
  text-indent: 5px;
  font-size: 14px;
}

li {
  height: 32px;
  line-height: 32px;
  background: #fff;
  position: relative;
  margin-bottom: 10px;
  padding: 0 45px;
  padding-right: 10px;
  border-radius: 3px;
  border-left: 5px solid #629A9C;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07);
}

ol li {
  cursor: move;
}

ul li {
  border-left: 5px solid #999;
  opacity: 0.5;
}

li a {
  position: absolute;
  top: 2px;
  right: 5px;
  display: inline-block;
  width: 14px;
  height: 12px;
  border-radius: 14px;
  border: 6px double #FFF;
  background: #CCC;
  line-height: 14px;
  text-align: center;
  color: #FFF;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
}

/*为动画添加过渡*/
.todo-enter-active {
  animation: Itemmove 0.5s linear;
}

.todo-leave-active {
  animation: Itemmove 0.5s linear;
}

@keyframes Itemmove {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>