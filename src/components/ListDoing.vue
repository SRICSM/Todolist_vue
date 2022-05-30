<template>
  <section>
    <h2>正在进行 <span id="todocount"></span></h2>
    <ol id="todolist" class="demo-box">
      <!--利用v-for遍历todos数组，将每一项（todoObj）传给MyItem，涉及到倒序插入，所以将key设置为id-->
      <MyItem
          v-for="todoObj in notTodos"
          :key="todoObj.id"
          :todo="todoObj"
      />
    </ol>
  </section>
</template>

<script>
import MyItem from "@/components/MyItem";

export default {
  name: "ListDoing",
  components: {MyItem},
  props: ['todos'],
  computed:{
    //渲染未完成的MyItem
    notTodos() {
      return this.todos.filter(todo => {
        return todo.done === false
      })
    },
  }
}
</script>

<style scoped>

</style>