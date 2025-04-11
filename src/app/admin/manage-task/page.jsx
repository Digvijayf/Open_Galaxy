'use client';
import React, { useState } from 'react';

const TaskManagementForm = () => {
  // State management
  const [formData, setFormData] = useState({
    taskTitle: '',
    priority: 'medium',
    status: '',
    description: '',
    deadline: '',
    estimatedHours: '',
    assignee: '',
    assigneeEmail: '',
    project: '',
    dependencies: [],
    notifications: [],
    notes: ''
  });
  
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        [name]: [...formData[name], value]
      });
    } else {
      setFormData({
        ...formData,
        [name]: formData[name].filter(item => item !== value)
      });
    }
  };
  
  // Handle priority selection
  const handlePriorityChange = (priority) => {
    setFormData({
      ...formData,
      priority
    });
  };
  
  // Tags management
  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };
  
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTag = tagInput.trim();
      
      if (newTag && !tags.includes(newTag)) {
        const updatedTags = [...tags, newTag];
        setTags(updatedTags);
        setTagInput('');
      }
    }
  };
  
  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create the final data object with all form values
    const finalData = {
      ...formData,
      tags
    };
    
    // In a real application, you would send this data to an API
    console.log('Form submitted:', finalData);
    alert('Task submitted successfully!');
  };
  
  // Reset form
  const handleReset = () => {
    setFormData({
      taskTitle: '',
      priority: 'medium',
      status: '',
      description: '',
      deadline: '',
      estimatedHours: '',
      assignee: '',
      assigneeEmail: '',
      project: '',
      dependencies: [],
      notifications: [],
      notes: ''
    });
    setTags([]);
    setTagInput('');
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Task Management Form</h1>
      
      <form onSubmit={handleSubmit}>
        {/* Task Title */}
        <div className="mb-4">
          <label htmlFor="taskTitle" className="block font-semibold mb-2">
            Task Title *
          </label>
          <input
            type="text"
            id="taskTitle"
            name="taskTitle"
            value={formData.taskTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter task title"
            required
          />
        </div>
        
        {/* Priority Level */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Priority Level</label>
          <div className="flex gap-4">
            <div
              className={`flex-1 text-center py-2 px-4 border rounded-md cursor-pointer ${
                formData.priority === 'low' 
                  ? 'bg-gray-100 border-gray-700 font-bold' 
                  : 'border-gray-300'
              } text-green-600`}
              onClick={() => handlePriorityChange('low')}
            >
              Low
            </div>
            <div
              className={`flex-1 text-center py-2 px-4 border rounded-md cursor-pointer ${
                formData.priority === 'medium' 
                  ? 'bg-gray-100 border-gray-700 font-bold' 
                  : 'border-gray-300'
              } text-yellow-600`}
              onClick={() => handlePriorityChange('medium')}
            >
              Medium
            </div>
            <div
              className={`flex-1 text-center py-2 px-4 border rounded-md cursor-pointer ${
                formData.priority === 'high' 
                  ? 'bg-gray-100 border-gray-700 font-bold' 
                  : 'border-gray-300'
              } text-red-600`}
              onClick={() => handlePriorityChange('high')}
            >
              High
            </div>
          </div>
        </div>
        
        {/* Status */}
        <div className="mb-4">
          <label htmlFor="status" className="block font-semibold mb-2">
            Current Status *
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select status</option>
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="on_hold">On Hold</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        
        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold mb-2">
            Task Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="4"
            placeholder="Enter detailed description of the task"
          ></textarea>
        </div>
        
        {/* Deadline */}
        <div className="mb-4">
          <label htmlFor="deadline" className="block font-semibold mb-2">
            Deadline *
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        {/* Estimated Hours */}
        <div className="mb-4">
          <label htmlFor="estimatedHours" className="block font-semibold mb-2">
            Estimated Hours
          </label>
          <input
            type="number"
            id="estimatedHours"
            name="estimatedHours"
            value={formData.estimatedHours}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            min="0"
            step="0.5"
            placeholder="Enter estimated hours"
          />
        </div>
        
        {/* Assignee */}
        <div className="mb-4">
          <label htmlFor="assignee" className="block font-semibold mb-2">
            Assigned To
          </label>
          <input
            type="text"
            id="assignee"
            name="assignee"
            value={formData.assignee}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter name of assignee"
          />
        </div>
        
        {/* Assignee Email */}
        <div className="mb-4">
          <label htmlFor="assigneeEmail" className="block font-semibold mb-2">
            Assignee Email
          </label>
          <input
            type="email"
            id="assigneeEmail"
            name="assigneeEmail"
            value={formData.assigneeEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter email of assignee"
          />
        </div>
        
        {/* Project */}
        <div className="mb-4">
          <label htmlFor="project" className="block font-semibold mb-2">
            Project
          </label>
          <select
            id="project"
            name="project"
            value={formData.project}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select project</option>
            <option value="project1">Website Redesign</option>
            <option value="project2">Mobile App Development</option>
            <option value="project3">Marketing Campaign</option>
            <option value="project4">Product Launch</option>
          </select>
        </div>
        
        {/* Tags */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Tags</label>
          <input
            type="text"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagKeyDown}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Add tags and press Enter"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 font-bold"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
        
        {/* Dependencies */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Dependencies</label>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="dep1"
                name="dependencies"
                value="task1"
                checked={formData.dependencies.includes('task1')}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="dep1">Task ID-001</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="dep2"
                name="dependencies"
                value="task2"
                checked={formData.dependencies.includes('task2')}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="dep2">Task ID-002</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="dep3"
                name="dependencies"
                value="task3"
                checked={formData.dependencies.includes('task3')}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="dep3">Task ID-003</label>
            </div>
          </div>
        </div>
        
        {/* Notification Preferences */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Notification Preferences</label>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notif1"
                name="notifications"
                value="email"
                checked={formData.notifications.includes('email')}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="notif1">Email</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notif2"
                name="notifications"
                value="sms"
                checked={formData.notifications.includes('sms')}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="notif2">SMS</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notif3"
                name="notifications"
                value="app"
                checked={formData.notifications.includes('app')}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="notif3">In-App</label>
            </div>
          </div>
        </div>
        
        {/* File Attachments */}
        <div className="mb-4">
          <label htmlFor="attachments" className="block font-semibold mb-2">
            Attachments
          </label>
          <input
            type="file"
            id="attachments"
            name="attachments"
            multiple
            className="w-full px-3 py-2"
          />
        </div>
        
        {/* Additional Notes */}
        <div className="mb-6">
          <label htmlFor="notes" className="block font-semibold mb-2">
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="3"
            placeholder="Enter any additional information"
          ></textarea>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="w-full py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Reset
          </button>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskManagementForm;