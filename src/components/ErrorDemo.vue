<template>
  <div class="error-demo">
    <h2>Source Map Error Demo</h2>
    <p>Click the buttons below to trigger errors:</p>

    <div class="button-group">
      <button @click="triggerUndefinedError" class="error-btn">
        Trigger Undefined Error
      </button>
      <button @click="triggerTypeError" class="error-btn">
        Trigger Type Error
      </button>
      <button @click="triggerReferenceError" class="error-btn">
        Trigger Reference Error
      </button>
    </div>

    <div v-if="result" class="result">
      {{ result }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const result = ref<string>('')

// This will cause an error when trying to access property on undefined
const triggerUndefinedError = () => {
  const obj: any = undefined
  // This line will throw: Cannot read property 'nonExistent' of undefined
  console.log(obj.nonExistent.property)
  result.value = 'This should not appear'
}

// This will cause a type error
const triggerTypeError = () => {
  const num: any = null
  // This line will throw: Cannot read properties of null
  const value = num.toUpperCase()
  result.value = value
}

// This will cause a reference error
const triggerReferenceError = () => {
  // @ts-ignore - intentionally calling undefined variable
  console.log(thisVariableDoesNotExist)
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
}

h2 {
  color: #c92a2a;
  margin-top: 0;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
}

.error-btn {
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background: #ff6b6b;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
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
