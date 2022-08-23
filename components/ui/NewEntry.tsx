import React, { ChangeEvent, useContext, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { EntriesContext } from '../../context/entries'
import { UIContext } from '../../context/ui'

export const NewEntry = () => {
    const { addNewEntry } = useContext(EntriesContext);
    const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);
    // const [isAdding, setIsAdding] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [touched, setTouched] = useState<boolean>(false);

    const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const onSave = () => {
        if (inputValue.length === 0) {
            return;
        };

        addNewEntry(inputValue);
        setIsAddingEntry(false);
        setTouched(false);
        setInputValue('');
    };

    return (
        <Box>
            {
                isAddingEntry ? (
                    <>
                        <TextField
                            fullWidth
                            placeholder="Nueva entrada"
                            autoFocus
                            multiline
                            label="Nueva entrada"
                            value={inputValue}
                            onChange={onTextFieldChanges}
                            helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
                            error={inputValue.length <= 0 && touched}
                            onBlur={() => setTouched(true)}
                        />
                        <Box
                            display='flex'
                            justifyContent="space-between"
                            margin="20px 0"
                        >
                            <Button
                                variant="text"
                                onClick={() => setIsAddingEntry(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                endIcon={<SaveOutlinedIcon />}
                                onClick={onSave}
                            >
                                Guardar
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Button
                        startIcon={<AddCircleOutlineOutlinedIcon />}
                        fullWidth
                        variant="outlined"
                        sx={{ marginBottom: '10px' }}
                        onClick={() => setIsAddingEntry(true)}
                    >
                        Agregar Tarea
                    </Button>
                )
            }


        </Box>
    )
}
