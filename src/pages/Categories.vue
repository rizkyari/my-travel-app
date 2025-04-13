<template>
    <div class="container py-5">
        <h2 class="mb-4 fw-bold">Category Management</h2>

        <BButton vaariant="primary" class="mb-3" @click="openAddModal">
            Add Category
        </BButton>

        <BTable :items="categoryStore.categories" :fields="fields" responsive bordered>
            <template #cell(actions)="data">
                <BButton size="sm" variant="info" class="me-2" @click="viewCategory(data.item)">View</BButton>
                <BButton size="sm" variant="warning" @click="editCategory(data.item)">Edit</BButton>
                <BButton size="sm" variant="danger" class="ms-2" @click="confirmDelete(data.item.documentId)">
                    Delete
                </BButton>
            </template>
        </BTable>

        <CategoryFormModal
        :isOpen="showModal"
        :isEditMode="isEditMode"
        :initialName="form.name"
        @update:isOpen="showModal = $event"
        @submit="submitCategory"
        />

        <BModal v-model="showDetailModal" title="Detail Kategori" centered no-footer>
            <div v-if="selectedCategory">
                <p><strong>ID:</strong> {{ selectedCategory.documentId }}</p>
                <p><strong>Nama:</strong> {{ selectedCategory.name }}</p>
            </div>
        </BModal>

        <ConfirmModal
        :isOpen="showConfirmModal"
        title="Delete Category"
        message="Are you sure you want to delete this category?"
        @update:isOpen="showConfirmModal = $event"
        @confirm="handleConfirmDelete"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref,onMounted } from 'vue';
import { useCategoryStore } from '../store/categoryStore';
import CategoryFormModal from '../components/CategoryFormModal.vue';
import ConfirmModal from '../components/ConfirmModal.vue';

const categoryStore = useCategoryStore()
const showModal = ref(false)
const isEditMode = ref(false)
const showDetailModal = ref(false)
const showConfirmModal = ref(false)
const selectedCategoryId = ref<string | null>(null)
const selectedCategory = ref<{ documentId: string, name: string } | null>(null)
const form = ref({
    name: '',
    documentId: null as string | null,
})
const fields = [
    {key: 'documentId', label: 'ID'},
    {key: 'name', label: 'Nama Kategori'},
    {key: 'actions', label: 'Aksi'}
]

onMounted(() => {
    categoryStore.fetchCategories()
})

const openAddModal = () => {
    isEditMode.value = false
    form.value = { name: '', documentId: null }
    showModal.value = true
}

const editCategory = (category: { documentId: string, name: string }) => {
    form.value = {
        documentId: category.documentId,
        name: category.name
    }
    isEditMode.value = true
    showModal.value = true
}

const confirmDelete = (documentId: string) => {
    selectedCategoryId.value = documentId
    showConfirmModal.value = true
}

const submitCategory = async (name: string) => {
    if (isEditMode.value && form.value.documentId !== null) {
        await categoryStore.updateCategory(form.value.documentId, {name})
    } else {
        await categoryStore.createCategory({name})
    }
    showModal.value = false
}

const viewCategory = (category: { documentId: string, name: string }) => {
    selectedCategory.value = category
    showDetailModal.value = true
}

const handleConfirmDelete = async () => {
    if (selectedCategoryId.value) {
        await categoryStore.deleteCategory(selectedCategoryId.value)
        selectedCategoryId.value = null
        showConfirmModal.value = false
    }
}
</script>