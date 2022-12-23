<template>
    <div style="display: inline-block; width: 640px; border: 1px dashed darkgrey;">
        <h3>Available ACLs:</h3>
        <div class="item" v-for="acl in acls" :key="acl.id">
            <div class="item-content">
                [{{ acl.id }}]: &quot;{{ acl.name }}&quot; (<i>&quot;{{ acl.description }}&quot;</i>)
            </div>
            <div class="item-buttons">
                <!--<input type="button" name="view" @click="viewACL(acl)" value="View" />-->
                <input type="button" name="edit" @click="editACL(acl)" value="Edit" />
                <input type="button" name="delete" @click="deleteACL(acl)" value="Delete" />
            </div>
        </div>
        <button @click="newACL" style="margin: 5px;">New ACL</button>
        <button @click="refresh" style="margin: 5px;">Refresh</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            acls: []
        }
    },
    methods: {
        newACL() {
            this.$router.push({ name: 'AclDetails', params: { id: '0' } })
        },
        /*viewACL(acl) {
            console.log('viewACL: ' + acl)
        },*/
        editACL(acl) {
            this.$router.push({ name: 'AclDetails', params: { id: acl.id } })
        },
        deleteACL(acl) {
            let url = 'http://localhost:3000/acls' + "/" + acl.id
            /*let index = this.acls.indexOf(acl)
            console.log('deleteACL.index: ' + index)
            if (index >= 0) {
                this.acls.splice(index, 1)
            }*/
            fetch(url, {
                method: 'delete'
            })
                .then((response) => {
                    response.json().then((response) => {
                        console.log(response);
                    })
                })
                .catch(function (error) {
                    console.log('Request failed', error);
                });
        }, refresh() {
            let url = 'http://localhost:3000/acls'
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    this.acls = data
                });

        }
    },
    created: function () {
        this.refresh()
    }
}
</script>

<style scoped>
.item {
    border: 1px solid darkgrey;
    margin: 5px;
    border-radius: 5px;
    padding: 5px;
    background: lightgray;
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
</style>