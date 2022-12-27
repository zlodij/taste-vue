<template>
    <div class="details">
        <label for="name">Name:</label>
        <input name="name" type="text" placeholder="Enter name" required v-model="accessorData.name" />

        <label for="permit">Permit:</label>
        <select name="permit" v-model="accessorData.permit" title="Choose Permit">
            <option value=""></option>
            <option value="1">NONE</option>
            <option value="2">BROWSE</option>
            <option value="3">READ</option>
            <option value="4">RELATE</option>
            <option value="5">VERSION</option>
            <option value="6">WRITE</option>
            <option value="7">DELETE</option>
        </select>

        <label for="xPermits">XPermits:</label>
        <select name="xPermits" multiple v-model="accessorData.xPermits" title="Choose XPermit(s)">
            <option value="EXECUTE_PROC">EXECUTE_PROC</option>
            <option value="CHANGE_LOCATION">CHANGE_LOCATION</option>
            <option value="CHANGE_STATE">CHANGE_STATE</option>
            <option value="CHANGE_FOLDER_LINKS">CHANGE_FOLDER_LINKS</option>
            <option value="CHANGE_OWNER">CHANGE_OWNER</option>
            <option value="DELETE_OBJECT">DELETE_OBJECT</option>
            <option value="CHANGE_PERMIT">CHANGE_PERMIT</option>
        </select>

        <div>
            <input name="alias" type="checkbox" v-model="accessorData.alias" />
            <label for="alias">Alias</label>
        </div>

        <div>
            <input name="svc" type="checkbox" v-model="accessorData.svc" />
            <label for="svc">Svc</label>
        </div>

        <span v-show="accessorData.svc">
            <label for="orgLevels">Org.Levels:</label>
            <select name="orgLevels" multiple v-model="accessorData.orgLevels" title="Choose Org.Level(s)">
                <option value="RD">Regional Direction (RD)</option>
                <option value="MR">Macro Region (MR)</option>
                <option value="OD">Outstanding Direction (OD)</option>
                <option value="CO">Central Office (CO)</option>
                <option value="VR">Super Region (VR)</option>
            </select>
        </span>

        <div class="buttons">
            <button @click="onSubmit">Apply</button>
            <button @click="onCancel">Cancel</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['accessor'],
    emits: ['apply', 'cancel'],
    data() {
        return {
            accessorData: {
                id: '',
                name: '',
                permit: 0,
                alias: false,
                svc: false,
                orgLevels: [],
                xPermits: []
            }
        }
    },
    created: function () {
        this.accessorData = JSON.parse(JSON.stringify(this.accessor))
    },
    methods: {
        onSubmit() {
            this.$emit('apply', this.accessorData)
        },
        onCancel() {
            this.$emit('cancel')
        }
    }
}
</script>

<style scoped>
.details {
    border: 1px solid darkgrey;
    border-radius: 5px;
    padding: 5px;
    background: wheat;
    text-align: left;
}

label {
    display: inline-block;
    margin: 15px 0 5px;
}

input,
select {
    display: block;
    width: 100%;
    box-sizing: border-box;
}

input[type="checkbox"] {
    display: inline-block;
    width: 16px;
    position: relative;
}

.buttons {
    padding: 5px;
    display: flex;
    column-gap: 5px;
    justify-content: center;
    flex-grow: 1;
}
</style>