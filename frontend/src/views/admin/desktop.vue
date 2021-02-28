<template>
  <div id="admin-desktop" class="app-container" v-loading.fullscreen.lock="loading"
        :element-loading-text="$t('common.confirmTran')">
    <div>
      <rewardDrop :pools="rewardlist" v-model="rewardAddress" @change="changeRewardDrop"/>
    </div>
    <el-row :gutter="20">
      <el-col :span="8">
        <defaultCard @confirm="switchAdmin">
          <template slot="title">
            {{$t("admin.switchAdmin")}}
          </template>
        </defaultCard>
      </el-col>
      <el-col :span="8">
        <acceptadmin @accept="acceptAdmin" :admin="adminAddress" :pendingAdmin="pendingAdminAddress">
        </acceptadmin>
      </el-col>
      <el-col :span="8">
        <defaultCard @confirm="addPerson">
          <template slot="title">
            {{$t("admin.addPerson")}}
          </template>
        </defaultCard>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <defaultCard @confirm="createCoins" :type="'int'">
          <template slot="title">
            {{$t("admin.createCoins")}}
          </template>
        </defaultCard>
      </el-col>
      <el-col :span="8">
      </el-col>
      <el-col :span="8">
      </el-col>
    </el-row>
    <spacev height="20px"></spacev>
    <div>
      <poolsDrop :pools="poolslist" v-model="poolAddress" />
    </div>
    <el-row :gutter="20">
      <el-col :span="8">
        <defaultCard @confirm="switchPoolAdmin">
          <template slot="title">
            {{$t("admin.switchPoolAdmin")}}
          </template>
        </defaultCard>
      </el-col>
      <el-col :span="8">
        <defaultCard @confirm="addPoolPerson">
          <template slot="title">
            {{$t("admin.addPoolPerson")}}
          </template>
        </defaultCard>
      </el-col>
      <el-col :span="8">
        <defaultCard @confirm="createWater" :type="'int'">
          <template slot="title">
            {{$t("admin.createWater")}}
          </template>
        </defaultCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import mixin from './mixin.js';

export default {
  mixins: [mixin],
}
</script>
<style lang="scss" scoped>
#admin-desktop{

}
</style>
