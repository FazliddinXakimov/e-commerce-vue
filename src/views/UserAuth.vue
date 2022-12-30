<script setup lang="ts">
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useNotification } from "@kyvg/vue3-notification";

const notification = useNotification()

const route = useRoute();
const router = useRouter();
const email = ref("")
const password = ref("")
const errMsg = ref('')


const schema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),

});


const register = async (values: any) => {

    const auth = getAuth()
    try {
        if (route.name == "Register") {
            let response: any = await createUserWithEmailAndPassword(auth, email.value, password.value)
            localStorage.setItem('userData', JSON.stringify(response._tokenResponse))



        }
        else {
            let response: any = await signInWithEmailAndPassword(auth, email.value, password.value)
            localStorage.setItem('userData', JSON.stringify(response._tokenResponse))

        }

        router.push('/products')

        notification.notify({
            title: `Welcome`,
            type: 'success'
        });

    } catch (error: any) {
        switch (error.code) {
            case 'auth/invalid-email':
                errMsg.value = "Invalid email";
                break;
            case 'auth/user-not-fount':
                errMsg.value = "No account with that email was fount";
                break;
            case 'auth/wrong-password':
                errMsg.value = "Incorrect password";
                break;
            default:
                errMsg.value = "Email or password incorrect";
                break;
        }

        notification.notify({
            title: `${errMsg.value}`,
            type: 'error'
        });

    }
}

</script>

<template>
    <div class="container">
        <div class="w-50 mx-auto mt-5">
            <div class="card  p-5">
                <Form @submit="register" :validation-schema="schema" v-slot="{ errors }">

                    <div>
                        <label>Email</label>
                        <Field v-model="email" name="email" type="text" class="form-control "
                            :class="{ 'is-invalid': errors.email }" />
                        <div class="invalid-feedback">{{ errors.email }}</div>
                    </div>

                    <div class="mt-2">
                        <label>Password</label>
                        <Field v-model="password" name="password" type="password" class="form-control "
                            :class="{ 'is-invalid': errors.password }" />
                        <div class="invalid-feedback">{{ errors.password }}</div>
                    </div>

                    <button type="submit" class="btn btn-primary btn-sm my-2">
                        {{ $route.name == 'Login' ? 'Sign In' : 'Sign Up' }}
                    </button>
                    <small v-if="$route.name == 'Login'" class="d-block">
                        Don't have an account? <router-link class="nav-link fw-bold d-inline-block text-primary"
                            to="/sign-up">Sign
                            up</router-link>
                    </small>
                    <small v-if="$route.name == 'Register'" class="d-block">
                        Don't have an account? <router-link class="nav-link fw-bold d-inline-block text-primary"
                            to="/sign-in">Sign
                            In</router-link>
                    </small>
                </Form>
            </div>
        </div>
    </div>
</template>

