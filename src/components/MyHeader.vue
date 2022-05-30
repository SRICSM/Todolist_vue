<template>
  <header>
    <section>
      <label for="title">ToDoList</label>
      <input type="text"
                  placeholder="请输入你的任务名称，按回车键确认"
                  required="required"
                  @keyup.enter="add"
      />
    </section>
  </header>
</template>

<script>
import {nanoid} from 'nanoid'

export default {
  name: "MyHeader",
  methods:{
    add(e){
     // 如果输入为空（没有输入）返回
      if(!e.target.value) return
      // 拿到输入的内容，将输入的内容包装成一个对象
      const todoObj = {id:nanoid(), title:e.target.value, done:false}
      // console.log(todoObj)
      // 触发自定义事件：this.$emit('atguigu',数据)
      this.$emit('addTodo',todoObj)
      // 清空输入
      e.target.value = ''
    }
  }
}
</script>

<style scoped>
header {
  height: 50px;
  background: #333;
  background: rgba(47, 47, 47, 0.98);
}
label {
  float: left;
  width: 100px;
  line-height: 50px;
  color: #DDD;
  font-size: 24px;
  cursor: pointer;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

header input {
  float: right;
  width: 60%;
  height: 24px;
  margin-top: 12px;
  text-indent: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.24), 0 1px 6px rgba(0, 0, 0, 0.45) inset;
  border: none
}
input:focus {
  outline-width: 0
}
</style>