<template>
  <div class="searchList">
    <van-nav-bar title="搜索列表" left-arrow @click-left="$router.go(-1)" />
    <van-search readonly shape="round" background="#ffffff" :value="querySearch || '搜索商品'" show-action
      @click="$router.push('/search')">
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>
    <div class="sort-btns">
      <div class="sort-item" @click="GetGoodsListData('all')">综合</div>
      <div class="sort-item" @click="GetGoodsListData('sales')">销量</div>
      <div class="sort-item" @click="GetGoodsListData('price')">价格</div>
    </div>
    <div class="goodsList">
      <GoodsItem v-for="item in searchlist" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import { GetGoodsListAPI } from '@/api/search'
import GoodsItem from '@/components/GoodsItem.vue'
export default {
  name: 'listIndex',
  components: { GoodsItem },
  created () {
    this.GetGoodsListData()
  },
  computed: {
    querySearch () {
      return this.$route.query.search
    },
    categoryId () {
      return this.$route.query.categoryId
    }
  },
  data () {
    return {
      searchlist: []
    }
  },
  methods: {
    async GetGoodsListData (key) {
      const res = await GetGoodsListAPI(this.querySearch, key, this.categoryId)
      this.searchlist = res.data.list.data
    }
  }
}
</script>

<style lang="less" scoped>
.searchList {
  height: 100vh;
  background-color: #f7f7f7;

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    justify-content: space-around;
    align-items: center;
    line-height: 40px;
    background-color: #fff;
    padding-bottom: 10px;
  }

}
</style>
