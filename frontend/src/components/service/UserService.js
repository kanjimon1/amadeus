class UserService {
    static BASE_URL = "http://localhost:8080";

    static async login(email, password) {
        try {
            const response = await fetch(`${UserService.BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Error en el inicio de sesión');
            }
            console.log("ESTA ES UNA RESPUESTA DESDE EL SERVICE REACT: ", response);
            return await response.json();

        } catch (err) {
            throw err;
        }
    }

    static async register(userData, token) {
        try {
            const response = await fetch(`${UserService.BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Error en el registro');
            }

            return await response.json();
        } catch (err) {
            throw err;
        }
    }

    static async getYourProfile(token) {

        try {
            const response = await fetch(`${UserService.BASE_URL}/adminuser/get-profile`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error en el registro');
            }

            return await response.json();
        } catch (err) {
            throw err;
        }
    }

    static async getAllExtraHoursUsers(token) {
        try {
            console.log("ANTES DE LISTAR LAS HORAS: ");
            const response = await fetch(`${UserService.BASE_URL}/list-eh`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
            console.log(`DESPUES DE LISTAR LAS HORAS: ${token}`, response);

            if (!response.ok) {
                throw new Error('Error obteniendo las horas');
            }

            //console.log(`JSON DE LISTAR: `, response.json());

            // Store the JSON response in a variable instead of logging it directly
            const data = await response.json();
            console.log('JSON DE LISTAR: ', data);

            return data;

            //return await response.json();
        } catch (err) {
            console.error("error retornando las horas extras", err);
            throw err;
        }
    }

    static async getAllExtraHoursUsersByUser(token, email) {
        try {
            console.log("TRY HORAS POR USUARIO: ");
            const response = await fetch(`${UserService.BASE_URL}/list-eh-user?email=${email}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
            console.log(`DESPUES HORAS POR USER: ${token}`, response);

            if (!response.ok) {
                throw new Error('Error obteniendo las horas');
            }

            //console.log(`JSON DE LISTAR: `, response.json());

            // Store the JSON response in a variable instead of logging it directly
            const data = await response.json();
            console.log('LISTAR HORAS USUARIOS JSON: ', data);

            return data;

            //return await response.json();
        } catch (err) {
            console.error("error retornando las horas extras", err);
            throw err;
        }
    }

    static async deleteUser(userId, token) {
        try {
            const response = await fetch(`${UserService.BASE_URL}/admin/delete/${userId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

            if (!response.ok) {
                throw new Error('Error eliminando el registro');
            }

            console.log("resultado de eliminar el rsgistro: ", response.json());
            return await response.json();

        } catch (err) {
            console.error("Error eliminanado el usuario: ", err);
            throw err;
        }
    }

    /** AUTHENTICATION CHECKER */
    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    static isAdmin() {
        const role = localStorage.getItem('role');
        return role === 'ADMIN';
    }

    static isUser() {
        const role = localStorage.getItem('role');
        return role === 'USER';
    }

    static adminOnly() {
        return this.isAuthenticated() && this.isAdmin();
    }
}

export default UserService;
