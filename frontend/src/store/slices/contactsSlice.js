import {createSlice} from "@reduxjs/toolkit";

const name = 'contacts';

export const initialState = {
    contacts: [],
    loading: false,
    error: null,
};

const contactsSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchContactsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchContactsSuccess(state, {payload: contacts}) {
            state.contacts = contacts;
            state.loading = false;
        },
        fetchContactsFailure(state, {payload}) {
            state.error = payload;
            state.loading = false;
        },
        editContactsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        editContactsSuccess(state, {payload: contacts}) {
            state.loading = false;
            state.contacts = contacts;
        },
        editContactsFailure(state, {payload}) {
            state.loading = false;
            state.error = payload;
        },
        clearContactsError(state) {
            state.error = null;
        }
    }
});

export const {
    fetchContactsRequest,
    fetchContactsSuccess,
    fetchContactsFailure,
    editContactsRequest,
    editContactsSuccess,
    editContactsFailure,
    clearContactsError
} = contactsSlice.actions;

export default contactsSlice;