<script setup lang="ts">
import { ref,watch,computed } from 'vue'
import { useCommentStore } from '../store/commentStore'
import { formatDate } from '../utils/format'
import { useAuthStore } from '../store/authStore';

import ConfirmModal from './ConfirmModal.vue';

const props = defineProps<{
  articleId: number | undefined
}>()

const commentStore = useCommentStore()
const authStore = useAuthStore()
const showModal = ref(false)
const selectedComment = ref<{ documentId: string; articleId: number} | null>(null)
const editingComment = ref<{ documentId: string; content: string} | null>(null)

watch(
    () => props.articleId,
    (val) => {
        if (val) {
            commentStore.fetchComments(val)
        }
    },
    { immediate: true }
)

const openConfirmModal = (documentId: string, articleId?: number) => {
    if (!articleId) return
    selectedComment.value = { documentId, articleId }
    showModal.value = true
    
}

const handleDelete = async() => {
    if(selectedComment.value) {
        await commentStore.deleteComment(
            selectedComment.value.documentId,
            selectedComment.value.articleId
        )
        selectedComment.value= null
    }
}

const startEditing = (comment: any) => {
    editingComment.value = {
        documentId: comment.documentId,
        content: comment.content
    }
}

const cancelEditing = () => {
    editingComment.value = null
}

const editingContent = computed({
  get: () => editingComment.value?.content ?? '',
  set: (val) => {
    if (editingComment.value) {
      editingComment.value.content = val
    }
  }
})

const submitEdit = async () => {
    if (!editingComment.value || !props.articleId) return

  await commentStore.updateComment(editingComment.value.documentId, editingComment.value.content, props.articleId)
  editingComment.value = null
}

</script>

<template>
    <div>
        <h5 class="fw-bold mb-3">Comments</h5>

        <div v-if="commentStore.loading" class="text-center">
            <BSpinner label="Loading comments..."/>
        </div>

        <div v-else-if="commentStore.error" class="text-danger text-center">
            {{ commentStore.error }}
        </div>

        <div v-else-if="commentStore.comments.length === 0" class="text-muted text-center">
            No Comments yet
        </div>

        <ul class="list-group">
            <li
            v-for="comment in commentStore.comments"
            :key="comment.id"
            class="list-group-item"
            >
                <div v-if="editingComment?.documentId === comment.documentId">
                    <BForm @submit.prevent="submitEdit">
                        <BFormTextarea
                        v-model="editingContent"
                        rows="2"
                        />
                        <div class="d-flex justify-content-end gap-2 mt-2">
                            <BButton size="sm" variant="secondary" @click="cancelEditing">Batal</BButton>
                            <BButton size="sm" variant="primary" type="submit">Simpan</BButton>
                        </div>
                    </BForm>
                </div>

                <div v-else>
                    <div class="w-100">
                        <p class="mb-1">{{ comment.content }}</p>
                        <small class="text-muted">
                            by {{ comment.user?.username || 'Anonym' }} - {{ formatDate(comment.createdAt) }}
                        </small>
                    </div>

                    <div v-if="comment.user?.id === authStore.user?.id" class="d-flex justify-content-center mt-2 mt-md-0">
                        <BButton
                        size="sm"
                        variant="outline-warning"
                        class="me-3"
                        @click="startEditing(comment)"
                        >
                            Edit
                        </BButton>
                        <BButton
                        variant="outline-danger"
                        size="sm"
                        @click="openConfirmModal(comment.documentId, articleId)"
                        >
                            Delete
                        </BButton>
                    </div>
                </div>
            </li>
        </ul>
        <ConfirmModal
        :title="'Delete Confirmation'"
        :message="'Are you sure you want to delete this comment?'"
        :isOpen="showModal"
        @update:is-open="showModal = $event"
        @confirm="handleDelete"
        />
    </div>
</template>