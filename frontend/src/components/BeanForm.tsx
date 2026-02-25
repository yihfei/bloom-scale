import React, { useState } from 'react';
import type { BeanData } from '../types/bean';


export const BeanForm = ({ onSubmit }: { onSubmit: (data: BeanData) => void }) => {
  const [formData, setFormData] = useState({
    name: '', 
    roaster: '', 
    origin: '', 
    variety: '', 
    process: '', 
    price: '',
    tastingNotes: ''
  });

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    // Simple validation
    if (!formData.name || !formData.roaster) return;

    onSubmit({
      ...formData,
      origin: formData.origin || undefined,
      variety: formData.variety || undefined,
      process: formData.process || undefined, 
      price: formData.price ? Number(formData.price) : undefined,
      tastingNotes: formData.tastingNotes || undefined
    } as BeanData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label>Name: <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></label>
      <label>Roaster: <input required value={formData.roaster} onChange={e => setFormData({...formData, roaster: e.target.value})} /></label>
      <label>Origin: <input value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} /></label>
      <label>Variety: <input value={formData.variety} onChange={e => setFormData({...formData, variety: e.target.value})} /></label>
      <label>Process: <input value={formData.process} onChange={e => setFormData({...formData, process: e.target.value})} /></label>
      <label>Price: <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} /></label>
      <label>Notes: <textarea value={formData.tastingNotes} onChange={e => setFormData({...formData, tastingNotes: e.target.value})} /></label>
      <button type="submit">Save Bean</button>
    </form>
  );
};