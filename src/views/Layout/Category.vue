<template>
  <div class="category">
    <van-nav-bar title="全部分类" fixed />
    <van-search readonly shape="round" background="#f1f1f2" placeholder="请输入搜索关键词" @click="$router.push('/search')" />
    <div class="categoryBox">
      <div class="left">
        <ul>
          <li v-for="(item, index) in list" :key="item.category_id">
            <a href="javascript:;" :class="{ active: acitveIndex === index }"
              @click="acitveIndex = index">{{ item.name }}</a>
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="cate_goods" v-for="item in list[acitveIndex]?.children" :key="item.category_id" @click="$router.push(`/searchlist?categoryId=${item.category_id}`)">
          <img :src="item.image?.external_url" alt="">
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetCategoryListAPI } from '@/api/search'
export default {
  name: 'categoryIndex',
  created () {
    this.GetCategoryListData()
  },
  data () {
    return {
      acitveIndex: 0,
      list: []
    }
  },
  methods: {
    async GetCategoryListData () {
      const res = await GetCategoryListAPI()
      console.log(res.data.list)
      this.list = res.data.list
    }
  }
}
</script>

<style lang="less" scoped>
.category {
  padding-top: 46px;
  height: 100vh;

  .categoryBox {
    display: flex;
    height: 100%;
    .left {
      width: 85px;
      height: 100%;
      background-color: #f3f3f3;
      overflow: auto;
      a {
        display: block;
        height: 45px;
        line-height: 45px;
        text-align: center;
        color: #444444;
        font-size: 12px;
        &.active {
          color: #fb442f;
          background-color: #fff;
        }
      }
    }
    .right {
      flex: 1;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 10px 0;
      overflow: auto;
      .cate_goods {
        width: 33.3%;
        margin-bottom: 10px;
        img {
          width: 70px;
          height: 70px;
          display: block;
          margin: 5px auto;
        }
        p {
          text-align: center;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
