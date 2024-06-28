<template>
  <div class="countBox">
    <button class="btn" @click="del">-</button><input class="ipt" type="text" :value="value" @change="OnChange"><button
      class="btn" @click="add">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    add () {
      this.$emit('input', this.value + 1)
    },
    del () {
      if (this.value <= 1) {
        return false
      }
      this.$emit('input', this.value - 1)
    },
    OnChange (e) {
      const num = +e.target.value
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
      }
      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less" scoped>
.countBox {

  .ipt {
    width: 40px;
    height: 30px;
    border: none;
    outline: none;
    background: #efefef;
    margin: 0 5px;
    text-align: center;
  }

  .btn {
    width: 30px;
    height: 30px;
    border: none;
    outline: none;
  }
}
</style>
