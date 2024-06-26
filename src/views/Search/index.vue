<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />
    <van-search show-action placeholder="请输入搜索关键词" v-model="search">
      <template #action>
        <div @click="onSearch(search)">搜索</div>
      </template>
    </van-search>
    <div class="searchBox" v-if="searchList.length > 0">
      <div class="searchpop">
        <span>最近搜索</span>
        <van-icon name="delete-o" size="16"  @click="clearList"/>
      </div>
      <div class="searchList" >
        <div class="list-item" v-for="(item, index) in searchList" :key="index" @click="$router.push(`/searchlist?search=${item}`)">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import { getSearch, setSearch } from '@/utils/storage'
export default {
  name: 'searchIndex',
  data () {
    return {
      search: '',
      searchList: getSearch([])
    }
  },
  methods: {
    onSearch (key) {
      if (key === '') {
        return
      }
      const Indexkey = this.searchList.indexOf(key)
      if (Indexkey !== -1) {
        this.searchList.splice(Indexkey, 1)
      }
      this.searchList.unshift(key)
      setSearch(this.searchList)
      router.push(`/searchlist?search=${key}`)
    },
    clearList () {
      this.searchList = []
      setSearch([])
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  height: 100vh;
  background-color: #f7f7f7;

  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  .searchpop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 40px;
    padding: 15px;
    font-size: 14px;
  }

  .searchList {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;

    .list-item {
      width: 30%;
      text-align: center;
      border-radius: 50px;
      padding: 7px;
      line-height: 22px;
      background-color: #fff;
      font-size: 15px;
      border: 1px solid #efefef;
      margin-bottom: 10px;

    }
  }
}
</style>
