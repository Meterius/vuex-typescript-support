<template>
  <div class="hello">
    <h1 @click="() => clickDisplay()">{{ display }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  get display() {
    return this.$store.getters.varBPlusTwo;
  }

  async clickDisplay() {
    await this.$store.dispatch("add", 5);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
