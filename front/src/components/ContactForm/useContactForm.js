import { useState, useEffect, useImperativeHandle } from 'react';
import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import { useErrors } from '../../hooks/useErrors';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';
import CategoriesService from '../../services/CategoriesService';

export default function useContactForm(onSubmit, ref) {
  const {
    setError, removeError, getErrorMessageByField, errors,
  } = useErrors();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = (name && errors.length === 0);

  useImperativeHandle(ref, () => ({
    setFieldValues: (contact) => {
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone) ?? '');
      setCategoryId(contact.category.id ?? '');
    },

    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    },
  }), []);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();
        setCategories(categoriesList);
      } catch {
        //
      } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, [setCategories, setIsLoadingCategories]);

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido' });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    const data = {
      name,
      email,
      phone: phone.replace(/\D/g, ''),
      categoryId,
    };

    await onSubmit(data);

    setIsSubmitting(false);
  }

  return {
    name,
    email,
    phone,
    categoryId,
    setCategoryId,
    categories,
    isLoadingCategories,
    isSubmitting,
    isFormValid,
    getErrorMessageByField,
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
    handleSubmit,
  };
}
