import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IconProps {
  color?: string;
  size: number;
  name: string;
  iconFamily: 'Ionicons' | 'MaterialComunityIcons' | 'MaterialIcons';
}

export default function Icon(props: IconProps) {
  return (
    <>
      {props.iconFamily === 'Ionicons' && (
        <Ionicons name={props.name} size={props.size} color={props.color} />
      )}
      {props.iconFamily === 'MaterialIcons' && (
        <MaterialIcons
          name={props.name}
          size={props.size}
          color={props.color}
        />
      )}
      {props.iconFamily === 'MaterialComunityIcons' && (
        <MaterialCommunityIcons
          name={props.name}
          size={props.size}
          color={props.color}
        />
      )}
    </>
  );
}
