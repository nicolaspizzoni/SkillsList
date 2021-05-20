import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import {Button} from '../components/Button';
import {SkillCard} from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [listSkills, setListSkills] = useState<SkillData[]>([]);
  const [greetings, setGreetings] = useState('');

  useEffect(() => {
    const currentHour = new Date().getHours();

    if(currentHour < 12){
      setGreetings('Bom dia');
    }else if(currentHour >= 12 && currentHour <= 18){
      setGreetings('Boa tarde')
    }else{
      setGreetings('Boa noite')
    }

  }, [])

  function handleRemoveSkill(id: string) {
    Alert.alert('Deletar Skill', 'Deseja deletar a skill selecionada?', [
      {
        text: 'Não',
      },
      {
        text: 'Sim',
        onPress: () => {
          return setListSkills(oldState => oldState.filter(skill => skill.id !== id))
        }
      },
    ])
  }

  function handleAddNewSkills() {

    if(newSkill === ''){
      Alert.alert('Atenção', 'Informe uma habilidade para adicionar a lista 💥')
      return;
    }

    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    setListSkills(oldState => [...oldState, data]);

    setNewSkill('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome, Nicolas</Text>
      <Text style={styles.greeting}>{greetings}</Text>
      <View style={styles.insert}>
        <TextInput
          style={styles.input}
          placeholder="New skill"
          placeholderTextColor="#555"
          value={newSkill}
          onChangeText={setNewSkill}
        />
        <Button title="+" onPress={handleAddNewSkills} />
      </View>
      <Text style={[styles.title, {marginVertical: 30}]}>My Skills</Text>
      <FlatList 
        data={listSkills}
        keyExtractor={item => item.id}
        renderItem={({item}) =>(
          <SkillCard 
          onPress={() => handleRemoveSkill(item.id)}
          skill={item.name}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma Skill adicionada 🤔</Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  greeting: {
    color: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 10,
  },
  insert: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 18,
    marginTop: 90
  }
});
