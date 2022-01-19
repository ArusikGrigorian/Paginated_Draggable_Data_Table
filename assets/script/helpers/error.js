function checkedForError(response) {
    if(!response.ok) {
        return;
    }

    return true;
};

export default checkedForError;