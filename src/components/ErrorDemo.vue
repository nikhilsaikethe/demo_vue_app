<template>
  <div class="error-demo">
    <h2>Source Map Error Demo</h2>
    <p>Click the button below to trigger an error and see how source maps help debugging:</p>

    <button @click="triggerError" class="error-btn">
      Trigger Error
    </button>

    <div v-if="result" class="result">
      {{ result }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const result = ref<string>('')

// This will cause an error when trying to access property on undefined
const triggerError = () => {
  const obj: any = undefined
  // This line will throw: Cannot read property 'nonExistent' of undefined
  console.log(obj.nonExistent.property)
  result.value = 'This should not appear'
}
</script>

<style scoped>
.error-demo {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border: 2px solid #ff6b6b;
  border-radius: 8px;
  background: #fff5f5;
  text-align: center;
}

h2 {
  color: #c92a2a;
  margin-top: 0;
}

.error-btn {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background: #ff6b6b;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  margin: 2rem 0;
}

.error-btn:hover {
  background: #ff5252;
}

.result {
  margin-top: 1rem;
  padding: 1rem;
  background: #e8f5e9;
  border-radius: 4px;
}
</style>
