import { Button, View } from "react-native";

interface ICounter {
    handleSubmit: () => void;
    handleIncrement: () => void;
    handleDecrement: () => void;
    value: number;
}

const Counter = ({
    handleSubmit,
    handleDecrement,
    handleIncrement,
    value,
}: ICounter) => {
    return(
        <View>
            {value}
            <Button title="Increment" onPress={handleIncrement} />
            <Button title="Decrement" onPress={handleDecrement} />
            <Button title="Pass" onPress={handleSubmit} />
        </View>
    );

};

export default Counter;