<template>
    <div class="details">
        <h4>Accessors:</h4>
        <div style="display: flex; column-gap: 5px;">
            <div style="flex-grow: 1;">
                <div class="item" v-for="accessor in accessors" :key="accessor.id">
                    <div class="item-content">
                        id:&quot;{{ accessor.id }}&quot;, name:&quot;{{ accessor.name }}&quot;, permit:&quot;{{ accessor.permit }}&quot;
                        , alias:&quot;{{ accessor.alias }}&quot;, svc:&quot;{{ accessor.svc }}&quot;, xPermits:&quot;{{ accessor.xPermits }}&quot;
                        , orgLevels:&quot;{{ accessor.orgLevels }}&quot;
                    </div>
                    <div class="item-buttons">
                        <input type="button" name="edit" @click="editAccessor(accessor)" value="Edit" />
                        <input type="button" name="delete" @click="deleteAccessor(accessor)" value="Delete" />
                    </div>
                </div>
                <button @click="addAccessor" style="margin: 5px;">Add</button>
            </div>
            <AccessorDetails v-if="showDetails" :accessor="accessor" @apply="handleApply" @cancel="handleCancel" />
        </div>
    </div>
</template>

<script>
import AccessorDetails from './AccessorDetails.vue'

export default {
    props: ['accessors'],
    components: { AccessorDetails },
    data: function () {
        return {
            showDetails: false,
            accessor: null
        }
    },
    methods: {
        addAccessor() {
            let id = + new Date();
            this.accessor = { id: id, name: '', permit: 0, alias: false, svc: false, orgLevels: [], xPermits: [] }
            this.showDetails = true
        },
        editAccessor(accessor) {
            this.accessor = accessor
            this.showDetails = true
        },
        deleteAccessor(accessor) {
            let index = this.accessors.indexOf(accessor)
            if (index >= 0) {
                this.accessors.splice(index, 1)
            }
        },
        handleApply(data) {
            if (data) {
                let hasId = data.hasOwnProperty("id")
                if (hasId) {
                    let index = this.accessors.findIndex(element => element.id == data.id);
                    if (index >= 0) {
                        this.accessors[index] = data
                    } else {
                        this.accessors.push(data)
                    }
                }
            }

            this.accessor = null
            this.showDetails = false
        },
        handleCancel() {
            this.accessor = null
            this.showDetails = false
        }
    }
}
</script>

<style scoped>
.item {
    border: 1px solid darkgrey;
    border-radius: 5px;
    padding: 5px;
    background: white;
    display: flex;
}

.item-content {
    text-align: left;
    flex-grow: 1;
}

.item-buttons {
    display: flex;
    column-gap: 5px;
    justify-content: space-between;
}

.fun {
    display: inline-block;
    width: 240px;
    padding: 0;
    margin: 0;
    border: 1px dashed lightcoral;
    vertical-align: top;
}
</style>