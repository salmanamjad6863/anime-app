import "./global.css";
import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput, Button } from "react-native";
import { Formik } from "formik";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './lib/firebase';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { useState } from "react"; // ✅ Remove useEffect
import { useNavigation } from "@react-navigation/native";

interface User {
    id: string;
    email?: string;     // ✅ Make optional
    createdAt?: string;
}

export default function Auth() {
    const [users, setUsers] = useState<User[]>([]);
    const navigation = useNavigation();

    const handleSubmit = async (values: { email: string; password: string }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                createdAt: new Date().toISOString(),
            });

            console.log("User created successfully");
            fetchUsers(); // ✅ Still auto-refetch after signup
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const usersData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as User));
            setUsers(usersData);
            console.log("Fetched users: ", usersData);
        } catch (error) {
            console.error("Error fetching users: ", error);
        }
    };

    // ✅ REMOVED useEffect - no auto-fetch on load!

    return (
        <View className="flex-1 items-center justify-center bg-background p-4">
            <Text className="text-xl font-bold text-foreground text-center mb-6">
                Signup to create account
            </Text>

            <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmit}>
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View className="w-[90%] mb-6">
                        <Text className="text-gray-300 mb-1">Email</Text>
                        <TextInput
                            className="bg-gray-800 text-foreground rounded-2xl p-3 mb-3 border border-gray-700"
                            placeholder="Enter your email"
                            placeholderTextColor="#9ca3af"
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                        />
                        <Text className="text-gray-300 mb-1">Password</Text>
                        <TextInput
                            className="bg-gray-800 text-foreground rounded-2xl p-3 mb-3 border border-gray-700"
                            placeholder="Enter your password"
                            placeholderTextColor="#9ca3af"
                            secureTextEntry
                            onChangeText={handleChange("password")}
                            value={values.password}
                        />
                        <Button title="Create User" onPress={handleSubmit as any} color="#2563eb" />
                    </View>
                )}
            </Formik>

            {/* ✅ NEW FETCH BUTTON */}
            <View className="mb-6 w-[90%]">
                <Button
                    title="🔄 Fetch Users"
                    onPress={fetchUsers}
                    color="#4b5563"
                />
                <Button
                    title="🚀 Go to Users Page"
                    onPress={() => navigation.navigate('Users' as never)}
                    color="#2563eb"
                />
            </View>

            <View className="w-full">
                <Text className="text-foreground text-lg font-bold mb-2">Users:</Text>
                {users.length === 0 ? (
                    <Text className="text-gray-400">Click "Fetch Users" to load</Text>
                ) : (
                    users.map(user => (
                        <View key={user.id} className="bg-gray-800 border border-gray-700 p-3 m-1 rounded-lg">
                            <Text className="text-gray-300">ID: {user.id.slice(0, 6)}...</Text>
                            <Text className="text-gray-300">Email: {user.email || 'No email'}</Text>
                            <Text className="text-gray-400 text-sm">Created: {user.createdAt?.slice(0, 10) || 'Unknown'}</Text>
                        </View>
                    ))
                )}
            </View>
        </View>
    );
}
