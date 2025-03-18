import { View, Text, TextInput, TouchableOpacity, Alert, Pressable, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';

type FormData = {
  name: string;
  description: string;
  ingredients: string[];
};

const ingredientsData = [
    "Tomate", "Oignon", "Poivron", "Ail", "Basilic", "Piment", "Thym", "Courgette", "Aubergine", "Chou", "Carotte", "Épinard", "Brocoli"
];

const schema = yup.object({
    name: yup.string().required("Le nom du plat est obligatoire"),
    description: yup.string().required("La description est obligatoire"),
    ingredients: yup.array().of(yup.string().required("L'ingrédient est obligatoire")).min(1, "Veuillez ajouter au moins un ingrédient").required(),
  }).required();
  

export default function AddDishForm() {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
        name: "",
        description: "",
        ingredients: [],
      },
  });

  const [loading, setLoading] = useState(false);
  const [ingredient, setIngredient] = useState(''); 
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [filteredIngredients, setFilteredIngredients] = useState<string[]>([]);
  

  function addIngredient(ingredient: string){
    if (ingredient.trim()) {
        setIngredientsList(prevState => [...prevState, ingredient.trim()]);
        setIngredient(''); // Réinitialiser le champ d'entrée de l'ingrédient
        setFilteredIngredients([]); // Réinitialiser les suggestions
      }
  };

  function removeIngredient(index: number){
    setIngredientsList(prevState => prevState.filter((_, i) => i !== index));
  };
  
  function filterIngredients(text: string){
      setIngredient(text);
      if (text.trim() === '') {
          setFilteredIngredients([]);
        } else {
            const filtered = ingredientsData.filter(ingredient =>
                ingredient.toLowerCase().startsWith(text.toLowerCase())
            );
            setFilteredIngredients(filtered);
        }
    };
    
  function onSubmit(data: FormData){
      setLoading(true);
      Alert.alert("Plat ajouté !", `Nom: ${data.name}\nPrix: ${data.ingredients.length} ingrédients`);
      reset();
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un Plat</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nom du plat :</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Nom du plat"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>
      {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description :</Text>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>
      {errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ingrédients :</Text>
        <TextInput
          style={styles.input}
          placeholder="Commencez à taper un ingrédient"
          value={ingredient}
          onChangeText={filterIngredients}
        />
        {filteredIngredients.length > 0 && (
          <View style={styles.suggestionsBox}>
            <FlatList
              data={filteredIngredients}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => addIngredient(item)}>
                  <View style={styles.suggestionItem}>
                    <Text style={styles.suggestionText}>{item}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>
        )}
      </View>

      {ingredientsList.length > 0 && (
        <FlatList
          data={ingredientsList}
          renderItem={({ item, index }) => (
            <View style={styles.ingredientItem}>
              <Text style={styles.ingredientText}>{item}</Text>
              <TouchableOpacity onPress={() => removeIngredient(index)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      {errors.ingredients && <Text style={styles.errorText}>{errors.ingredients.message}</Text>}

      <Pressable
        style={[styles.button, { opacity: loading ? 0.5 : 1 }]}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Ajout en cours..." : "Ajouter le plat"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
    alignSelf: 'center',
  },
  inputContainer: {
    backgroundColor: '#f7f7f7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  addButton: {
    backgroundColor: '#2ecc71',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    padding: 4,
    borderRadius: 4,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  suggestionsBox: {
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 8,
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  suggestionText: {
    color: '#333',
  },
});
