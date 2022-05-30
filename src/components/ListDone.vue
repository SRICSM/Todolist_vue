<template>
  <section>
    <h2>
      <input type="checkbox" :checked="isAll" @change="checkAll">
      已经完成{{ doneTotal }}/全部任务{{ total }}
      <span id="donecount"></span>
      <button class="btn cleanbtn" @click="cleanAll">清除全部已完成任务</button>
    </h2>
    <ul id="donelist">
      <MyItem
          v-for="toDone in todosDone"
          :key="toDone.id"
          :todo="toDone"
      />
    </ul>
  </section>
</template>

<script>
import MyItem from "@/components/MyItem";

export default {
  name: "ListDone",
  components: {MyItem},
  props: ['todos', "cleanAllTodo"],
  computed: {
    //渲染已完成的MyItem
    todosDone() {
      return this.todos.filter(todo => {
        return todo.done === true
      })
    },
    // 传过来的数据在vc身上，故可以直接参与计算属性的计算
    total() {
      return this.todos.length
    },
// 简写计算属性 简写(对应不修改的对象)  省略set
    doneTotal() {
      // 数组长度为reduce函数调用的次数  reduce函数两个参数，一个是回调函数，一个是累计初始值
      // pre	必需   初始值, 或者计算结束后的返回值。
      // current	必需   当前元素
      // 也可以把回调函数写到外面去
      return this.todos.reduce((pre, current) => {
        return pre + (current.done ? 1 : 0)
      }, 0)
    },
    //手动选择了所有的todo，要勾选全选按钮
    isAll() {
      return this.doneTotal === this.total && this.total > 0
    }
  },
  methods: {
    // 全选或者取消全选
    checkAll(e) {
      this.$emit('checkAllTodo', e.target.checked)
    },
    cleanAll(e) {
      // 调用利用props传过来的函数，并传入参数
      this.cleanAllTodo(e.target.checked)
    }
  }
}
</script>

<style scoped>
h2 input {
  width: 22px;
  height: 22px;
  cursor: pointer;
}
</style>