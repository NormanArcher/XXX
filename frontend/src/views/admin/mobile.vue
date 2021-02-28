<template>
  <div id="admin-device" class="app-container" v-loading.fullscreen.lock="loading"
        :element-loading-text="$t('common.confirmTran')">
    <div>
      <rewardDrop :pools="rewardlist" v-model="rewardAddress" @change="changeRewardDrop"/>
    </div>
    <defaultCard @confirm="switchAdmin">
      <template slot="title">
        {{$t("admin.switchAdmin")}}
      </template>
    </defaultCard>
    <acceptadmin @accept="acceptAdmin" :admin="adminAddress" :pendingAdmin="pendingAdminAddress">
    </acceptadmin>
    <defaultCard @confirm="addPerson">
      <template slot="title">
        {{$t("admin.addPerson")}}
      </template>
    </defaultCard>
    <defaultCard @confirm="createCoins" :type="'int'">
      <template slot="title">
        {{$t("admin.createCoins")}}
      </template>
    </defaultCard>
    <spacev height="20px"></spacev>
    <div>
      <poolsDrop :pools="poolslist" v-model="poolAddress" />
    </div>
    <defaultCard @confirm="switchPoolAdmin">
      <template slot="title">
        {{$t("admin.switchPoolAdmin")}}
      </template>
    </defaultCard>
    <defaultCard @confirm="addPoolPerson">
      <template slot="title">
        {{$t("admin.addPoolPerson")}}
      </template>
    </defaultCard>
    <defaultCard @confirm="createWater" :type="'int'">
      <template slot="title">
        {{$t("admin.createWater")}}
      </template>
    </defaultCard>
  </div>
</template>

<script>
import mixin from './mixin.js';

export default {
  mixins: [mixin],
}
</script>
<style lang="scss" scoped>
#admin-device{

}
</style>
