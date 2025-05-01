import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Notify } from 'notiflix';

export const login = createAsyncThunk('api/user/login', async (credentials, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:5005/users/signin', credentials);
        localStorage.setItem('token', response.data.token);
        Notify.success('Ви успішно зайшли');
        return response.data;
    } catch (error) {
        Notify.failure(error.response?.data?.message || 'Не вийшло зайти сорі брат>');
        return thunkAPI.rejectWithValue(error.message);
    }
});


export const register = createAsyncThunk(
    'user/register',
    async (userData, thunkAPI) => {
        try {

            await axios.post('http://localhost:5005/users/signup', userData);

            Notify.success('Ви успішно зареєструвалися! Увійдіть у свій обліковий запис.');
            return userData;
        } catch (error) {
            Notify.failure(error.response?.data?.message || 'Щось пішло не так');
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);



export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return thunkAPI.rejectWithValue('No token found'); 
    }
    try {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        await axios.post('http://localhost:5005/users/logout');
        localStorage.removeItem('token');
        localStorage.removeItem('authToken');
        return { message: 'Logged out successfully' };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});


export const fetchUserData = async (token) => {
    try {
        const response = await axios.get('http://localhost:5005/users/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Помилка отримання даних користувача:', error);
        throw error;
    }
};
