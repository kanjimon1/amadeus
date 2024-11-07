import React, { useState } from 'react';
//import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Input, Select } from '@/components/ui/dialog';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';


const CreateModal = ({ isOpen, onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        employeeId: '',
        employeeName: '',
        jobName: '',
        salary: '',
        areaName: '',
        percentage: '',
        description: '',
        startDatetime: '',
        endDatetime: '',
        hourPrice: '',
        amountExtraHours: '',
        comments: '',
        totalExtraHour: '',
        totalPayment: '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onCreate(formData);
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose}
            classes={{ paper: 'customDialog' }} // Customize width and height here
        >
            <DialogTitle>Crear nuevo registro</DialogTitle>
            <DialogContent>
                <div className="grid grid-cols-2 gap-4">
                    <p>ID</p><Input name="employeeId" label="ID empleado" value={formData.employeeId} onChange={handleInputChange} />
                    <p>Nombre Empleado</p><Input name="employeeName" label="Nombre empleado" value={formData.employeeName} onChange={handleInputChange} />
                    <p>Cargo</p><Input name="jobName" label="Cargo" value={formData.jobName} onChange={handleInputChange} />
                    <p>Salario</p><Input name="salary" label="Salario" value={formData.salary} onChange={handleInputChange} />
                    <p>Area</p><Input name="areaName" label="Area" value={formData.areaName} onChange={handleInputChange} />
                    <p>% H/Extra</p><Input name="percentage" label="% H/Extra" value={formData.percentage} onChange={handleInputChange} />
                    <p>Desc H/Extra</p><Input name="description" label="Desc H/Extra" value={formData.description} onChange={handleInputChange} />
                    <p>startDatetime</p><Input name="startDatetime" label="startDatetime" value={formData.startDatetime} onChange={handleInputChange} />
                    <p>endDatetime</p><Input name="endDatetime" label="endDatetime" value={formData.endDatetime} onChange={handleInputChange} />
                    <p>hourPrice</p><Input name="hourPrice" label="hourPrice" value={formData.hourPrice} onChange={handleInputChange} />
                    <p>amountExtraHours</p><Input name="amountExtraHours" label="amountExtraHours" value={formData.amountExtraHours} onChange={handleInputChange} />
                    <p>comments</p><Input name="comments" label="comments" value={formData.comments} onChange={handleInputChange} />
                    <p>totalExtraHour</p><Input name="totalExtraHour" label="totalExtraHour" value={formData.totalExtraHour} onChange={handleInputChange} />
                    <p>totalPayment</p><Input name="totalPayment" label="totalPayment" value={formData.totalPayment} onChange={handleInputChange} />
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant="secondary" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Crear
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateModal;