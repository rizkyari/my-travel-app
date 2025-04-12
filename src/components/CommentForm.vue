<template>
    <BForm @submit.prevent="handleSubmit">
        <BFormGroup label="Write Comment" label-for="commentContent">
            <BFormTextarea
            id="commentContent"
            v-model="content"
            placeholder="Write comment here..."
            rows="3"
            required
            />
        </BFormGroup>
  
        <BButton class="my-3" type="submit" variant="primary" :disabled="commentStore.loading || !content.trim()">
            {{ commentStore.loading ? 'Submitting...' : 'Submit' }}
        </BButton>
  
        <BAlert
        v-if="commentStore.error"
        variant="danger"
        class="mt-3"
        dismissible
        >
            {{ commentStore.error }}
        </BAlert>
    </BForm>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { useCommentStore } from '../store/commentStore'
  
const props = defineProps<{
    articleId: number | undefined
}>()
  
const content = ref('')
const commentStore = useCommentStore()
  
const handleSubmit = async () => {
    if (!content.value.trim() || !props.articleId) return
    await commentStore.addComment(content.value, props.articleId)
    content.value = ''
}
</script>
  