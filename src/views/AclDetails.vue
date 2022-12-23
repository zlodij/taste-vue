<template>
    <div style="display: inline-block; width: 320px;">
        <h3>{{ title }}</h3>
        <div class="details">
            <label>Name:</label>
            <input name="name" type="text" placeholder="Enter name" required v-model="acl.name" />

            <label>Description:</label>
            <input name="description" type="text" placeholder="Enter description" v-model="acl.description" />

            <label>Obj.Types:</label>
            <select multiple v-model="acl.objTypes">
                <option value="bnk_pledge">Pledge</option>
                <option value="bnk_limit">Limit</option>
                <option value="bnk_covenant">Covenant</option>
            </select>

            <label>Statuses:</label>
            <select multiple v-model="acl.statuses">
                <!--
                <option value="PLG_S_ACTIVE">ACTIVE</option>
                <option value="PLG_S_CLOSED">CLOSED</option>
                <option value="PLG_S_NEW">NEW</option>
            -->
            </select>

            <div class="buttons">
                <button @click="onApply">Apply</button>
                <button @click="onCancel">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['id'],
    data() {
        return {
            title: '',
            acl: {
                id: '',
                name: '',
                description: '',
                objTypes: [],
                statuses: [],
                accessors: []
            }
        }
    },
    methods: {
        onCancel() {
            console.log('onCancel')
            this.$router.push({ name: 'Acls' })
        },
        onApply() {
            console.log('onApply')

            let url = 'http://localhost:3000/acls'
            let method = 'post'
            let payload = JSON.stringify(this.acl)

            if (this.id != '0') {
                url += '/' + this.acl.id
                method = 'put'
                console.log('url: ' + url)
            }

            console.log('onApply: method=' + method + ", url=" + url);

            fetch(url, {
                method: method,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: payload
            }).then((response) => {
                response.json().then((response) => {
                    console.log(response);
                })
            }).catch(function (error) {
                console.log('Request failed', error);
            });

            this.$router.push({ name: 'Acls' })
        }
    },
    created: function () {
        if (this.id != '0') {
            this.title = 'Edit ACL: '

            let url = 'http://localhost:3000/acls' + "/" + this.id
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    this.acl = data
                    this.title += data.name
                });
        } else {
            this.title = 'New ACL'
        }
    }
}
</script>

<style>
.details {
    margin: 10px auto;
    border: 1px solid darkgrey;
    border-radius: 5px;
    padding: 5px;
    background: lightgray;
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

.buttons {
    padding-top: 5px;
    display: flex;
    column-gap: 5px;
}
</style>