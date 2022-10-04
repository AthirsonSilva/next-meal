import React from 'react';
import { SafeAreaView, FlatList, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Card, Button } from 'react-bootstrap';
import styles from './style';
import axios from 'axios';
import { AnyCnameRecord } from 'dns';

const DATA = Array();

(async function getRestaurants() {
	await axios({
		method: 'get',
		url: 'http://localhost:8000/api/restaurantes',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	})
		.then((response) => {
			console.table(response.data);

			response.data.forEach((item: any) => {
				DATA.push({
					id: item.idRestaurante,
					title: item.nomeRestaurante,
					type: item.tipoRestaurante,
					rating: item.notaAvaliacao,
				});
			});

			console.table(DATA);
			return JSON.parse(JSON.stringify(response.data));
		})
		.catch((err) => console.error(err));
})();

function Item({
	title,
	rating,
	type,
}: {
	title: string;
	rating: number;
	type: string;
}): JSX.Element {
	return (
		<View>
			<Card
				style={{
					width: '22em',
					border: 'none',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Card.Img
					variant="top"
					src={require('../../assets/example.jpeg')}
				/>
				<Card.Body
					style={{
						flex: 1,
						alignItems: 'flex-start',
						justifyContent: 'flex-start',
					}}
				>
					<Card.Title>{title}</Card.Title>
					<Card.Text>
						Tipo de cozinha: {type || 'Não informado'}
					</Card.Text>
					<Card.Text>Nota: {rating || 0} / 5.0</Card.Text>
					<Button variant="primary" style={{ marginRight: 5 }}>
						Reservar
					</Button>
				</Card.Body>
			</Card>
		</View>
	);
}

function renderItem(item: JSX.Element) {
	return (
		<Item
			title={item.item.title}
			rating={item.item.rating}
			type={item.item.type}
		/>
	);
}

export default function BookScreen({
	navigation,
}: {
	navigation: any;
}): JSX.Element {
	const [search, setSearch] = React.useState('');
	const [filteredDataSource, setFilteredDataSource] = React.useState<never[]>(
		[]
	);
	const [masterDataSource, setMasterDataSource] =
		React.useState<never[]>(DATA);

	const searchFilterFunction = (text: string) => {
		// Check if searched text is not blank
		if (text) {
			// Inserted text is not blank
			// Filter the masterDataSource and update FilteredDataSource
			const newData = masterDataSource.filter((item) => {
				// Applying filter for the inserted text in search bar
				const itemData = item.title
					? item.title.toUpperCase()
					: ''.toUpperCase();

				const textData = text.toUpperCase();

				return itemData.indexOf(textData) > -1;
			});
			setFilteredDataSource(newData);
			setSearch(text);
		} else {
			// Inserted text is blank
			// Update FilteredDataSource with masterDataSource
			setFilteredDataSource(masterDataSource);
			setSearch(text);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<SearchBar
				placeholder="Pesquisar restaurantes..."
				lightTheme
				platform="android"
				round
				value={search}
				onChangeText={(text) => searchFilterFunction(text)}
				autoCorrect={false}
				blurOnSubmit={true}
				autoFocus={true}
				style={{
					width: '72vw',
				}}
			/>
			<FlatList
				data={filteredDataSource}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				scrollEnabled={true}
			/>
		</SafeAreaView>
	);
}