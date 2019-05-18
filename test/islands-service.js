'use strict';

const axios = require('axios');
const baseUrl = 'http://localhost:3000';


class IslandsService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getIslands() {
        try {
            const response = await axios.get(this.baseUrl + '/api/islands');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async getIslands(id) {
        try {
            const response = await axios.get(this.baseUrl + '/api/islands/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }



    async createIslands (newIsland) {
        const response = await axios.post(this.baseUrl + '/api/createisland', newIsland);
        return response.data;
    }

    async deleteAllIslands() {
        const response = await axios.delete(this.baseUrl + '/api/deleteislands');
        return response.data;
    }

    async deleteOneIsland(id) {
        try {
            const response = await axios.delete(this.baseUrl + '/api/deleteisland/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async getRegions() {
        try {
            const response = await axios.get(this.baseUrl + '/api/regions' );
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async getRegions(id) {
        try {
            const response = await axios.get(this.baseUrl + '/api/regions/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }


    async createRegion(newRegion) {

        try {
            const response = await axios.post(this.baseUrl + '/api/createregion', newRegion);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteOneRegion(id) {
        try {
            const response = await axios.delete(this.baseUrl + '/api/deleteregion/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }




    async getUsers() {
        try {
            const response = await axios.get(this.baseUrl + '/api/users');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async getUser(id) {
        try {
            const response = await axios.get(this.baseUrl + '/api/users/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async createUser(newUser) {

        try {
            const response = await axios.post(this.baseUrl + '/api/createuser', newUser);
            return response.data;
        } catch (e) {
            return null;
        }
    }



    async deleteAllUsers() {
        try {
            const response = await axios.delete(this.baseUrl + '/api/deleteusers');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteAllRegions() {
        try {
            const response = await axios.delete(this.baseUrl + '/api/deleteregions');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async authenticate(user) {
        try {
            const response = await axios.post(this.baseUrl + '/api/users/authenticate', user);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async clearAuth(user) {
        axios.defaults.headers.common['Authorization'] = '';
    }

    async deleteOneUser(id) {
        try {
            const response = await axios.delete(this.baseUrl + '/api/deleteuser/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }
}

module.exports = IslandsService;





