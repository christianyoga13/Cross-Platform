export type RootStackParamList = {
    Home: undefined;
    Details: { itemId: number; otherParam: string };
    Profile: { userId: string };
    Search: { query: string }; // Add this line for the Search page
};