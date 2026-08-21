import {
	Badge,
	Box,
	Button,
	Group,
	Menu,
	Paper,
	ScrollArea,
	SimpleGrid,
	Stack,
	Text,
	ThemeIcon,
} from "@mantine/core";
import {
	Icon,
	iconChart,
	iconChevronDown,
	iconChevronRight,
	iconDatabase,
	iconHomePlus,
	iconQuery,
	iconRelation,
} from "@surrealdb/ui";
import { useMemo } from "react";
import { useImmer } from "use-immer";
import { Link } from "wouter";
import { adapter } from "~/adapter";
import { ConnectionAddressDetails } from "~/components/ConnectionDetails/address";
import { ConnectionAuthDetails } from "~/components/ConnectionDetails/authentication";
import { ConnectionNameDetails } from "~/components/ConnectionDetails/connection";
import { ConnectionLabelsDetails } from "~/components/ConnectionDetails/labels";
import { PageBreadcrumbs } from "~/components/PageBreadcrumbs";
import { PrimaryTitle } from "~/components/PrimaryTitle";
import { useLastSavepoint } from "~/hooks/overview";
import { useConnectionNavigator } from "~/hooks/routing";
import { useStable } from "~/hooks/stable";
import { useConfigStore } from "~/shell/stores/config";
import { Template } from "~/types";
import { tagEvent } from "~/shared/util/analytics";
import { getConnectionVariant, isConnectionValid } from "~/shared/util/connection";
import { createBaseConnection } from "~/shared/util/defaults";
import { dispatchIntent } from "~/shared/util/intents";
import { USER_ICONS } from "~/shared/util/user-icons";
import classes from "./style.module.scss";

export function CreateConnectionPage() {
	const { settings, addConnection } = useConfigStore.getState();

	const [connection, setConnection] = useImmer(() => {
		const draft = createBaseConnection(settings);

		draft.name = "Local RRFlow";
		draft.authentication.protocol = "ws";
		draft.authentication.hostname = `localhost:${settings.serving.port}`;
		draft.authentication.username = settings.serving.username;
		draft.authentication.password = settings.serving.password;

		return draft;
	});
	const navigateConnection = useConnectionNavigator();

	const isValid = useMemo(() => {
		return connection.name && isConnectionValid(connection.authentication);
	}, [connection.authentication, connection.name]);

	const handleCreate = useStable(() => {
		addConnection(connection);
		navigateConnection(connection.id);

		tagEvent("connection_created", {
			protocol: connection.authentication.protocol.toString(),
			variant: getConnectionVariant(connection),
			is_local: connection.authentication.hostname.includes("localhost"),
		});
	});

	const applyTemplate = (template: Template) => {
		setConnection((draft) => {
			draft.name = template.name;
			draft.icon = template.icon;
			draft.labels = template.labels;
			draft.authentication = template.values;
		});
	};

	const openTemplates = useStable(() => {
		dispatchIntent("open-settings", { tab: "templates" });
	});

	// const newLocalhost = useStable(() => {
	// 	const { username, password, port } = useConfigStore.getState().settings.serving;

	// 	const template = JSON.stringify({
	// 		name: "Local database",
	// 		icon: 0,
	// 		values: {
	// 			mode: "root",
	// 			database: "",
	// 			namespace: "",
	// 			protocol: "ws",
	// 			hostname: `localhost:${port}`,
	// 			scope: "",
	// 			scopeFields: [],
	// 			access: "",
	// 			token: "",
	// 			username,
	// 			password,
	// 		},
	// 	});

	// 	dispatchIntent("new-connection", { template });
	// 	openedHandle.close();
	// });

	const localhost = useMemo(() => {
		const { username, password, port } = useConfigStore.getState().settings.serving;

		return {
			id: "_localhost",
			name: "Local database",
			icon: 0,
			values: {
				mode: "root",
				database: "",
				namespace: "",
				protocol: "ws",
				hostname: `localhost:${port}`,
				accessFields: [],
				access: "",
				token: "",
				username,
				password,
			},
		} as Template;
	}, []);

	const templates = useConfigStore((s) => s.settings.templates.list);
	const savepoint = useLastSavepoint();

	return (
		<Box
			flex={1}
			pos="relative"
		>
			<ScrollArea
				pos="absolute"
				scrollbars="y"
				type="scroll"
				inset={0}
				className={classes.scrollArea}
				mt={18}
			>
				<Stack
					px="xl"
					mx="auto"
					maw={1200}
					pb={68}
				>
					<Box>
						<PageBreadcrumbs
							items={[
								{ label: "Connectome", href: "/overview" },
								{ label: "Connections" },
								{ label: "Create" },
							]}
						/>
						<Group mt="sm">
							<PrimaryTitle
								fz={32}
								flex={1}
							>
								Connect to RRFlow
							</PrimaryTitle>
							<Menu position="bottom-end">
								<Menu.Target>
									<Button
										rightSection={<Icon path={iconChevronDown} />}
										color="violet"
										variant="light"
									>
										Apply template
									</Button>
								</Menu.Target>
								<Menu.Dropdown miw={200}>
									{adapter.isServeSupported && (
										<>
											<Menu.Item
												onClick={() => applyTemplate(localhost)}
												leftSection={
													<ThemeIcon
														color="obsidian"
														variant="light"
														radius="xs"
														mr="xs"
													>
														<Icon path={iconHomePlus} />
													</ThemeIcon>
												}
											>
												<Box>
													<Text
														c="bright"
														fw={500}
														lh={1}
													>
														Localhost
													</Text>
													<Text fz="sm">Automatic template</Text>
												</Box>
											</Menu.Item>
											<Menu.Divider />
										</>
									)}
									{templates.length > 0 && (
										<>
											{templates.map((template) => (
												<Menu.Item
													key={template.id}
													onClick={() => applyTemplate(template)}
													leftSection={
														<ThemeIcon
															color="obsidian"
															variant="light"
															radius="xs"
															mr="xs"
														>
															<Icon
																path={USER_ICONS[template.icon]}
															/>
														</ThemeIcon>
													}
												>
													<Text
														c="bright"
														fw={500}
													>
														{template.name}
													</Text>
												</Menu.Item>
											))}
											<Menu.Divider />
										</>
									)}
									<Menu.Item
										rightSection={<Icon path={iconChevronRight} />}
										onClick={openTemplates}
									>
										Manage templates
									</Menu.Item>
								</Menu.Dropdown>
							</Menu>
						</Group>
					</Box>
					<Paper
						p="xl"
						className={classes.instanceHero}
					>
						<Group
							align="flex-start"
							wrap="nowrap"
						>
							<Box flex={1}>
								<Group gap="xs">
									<Badge
										variant="light"
										color="violet"
									>
										Native control surface
									</Badge>
									<Badge
										variant="dot"
										color="green"
									>
										Surreal-compatible transport
									</Badge>
								</Group>
								<Text
									fz="xl"
									fw={650}
									c="bright"
									mt="md"
								>
									Attach Connectome to an RRFlow runtime
								</Text>
								<Text
									maw={720}
									mt={4}
								>
									The profile is stored locally. Once the runtime answers the
									handshake, Connectome opens the same live instance through its
									query, data, graph, schema, and diagnostic lenses.
								</Text>
							</Box>
							<Box className={classes.runtimePulse}>
								<span />
								<span />
								<span />
							</Box>
						</Group>

						<SimpleGrid
							cols={{ base: 2, sm: 4 }}
							mt="xl"
							spacing="sm"
						>
							{[
								[iconDatabase, "Data", "Tables & records"],
								[iconRelation, "Graph", "Relations & paths"],
								[iconQuery, "Query", "SurrealQL studio"],
								[iconChart, "Diagnose", "Connection & schema"],
							].map(([icon, label, detail]) => (
								<Group
									key={label}
									className={classes.capability}
									wrap="nowrap"
								>
									<ThemeIcon
										variant="light"
										color="violet"
									>
										<Icon path={icon} />
									</ThemeIcon>
									<Box>
										<Text
											fz="sm"
											fw={650}
											c="bright"
										>
											{label}
										</Text>
										<Text fz="xs">{detail}</Text>
									</Box>
								</Group>
							))}
						</SimpleGrid>
					</Paper>
					<Box mt={24}>
						<Text
							fz="xl"
							fw={600}
							c="bright"
						>
							Instance identity
						</Text>
						<Text>Name this RRFlow runtime so it is easy to find later</Text>
					</Box>
					<ConnectionNameDetails
						value={connection}
						onChange={setConnection}
					/>
					<Box mt={32}>
						<Text
							fz="xl"
							fw={600}
							c="bright"
						>
							Runtime endpoint
						</Text>
						<Text>
							Connect locally or over the network using RRFlow's compatible endpoint
						</Text>
					</Box>
					<ConnectionAddressDetails
						value={connection}
						onChange={setConnection}
					/>
					<Box mt={24}>
						<Text
							fz="xl"
							fw={600}
							c="bright"
						>
							Runtime access
						</Text>
						<Text>Provide the credentials and initial namespace/database scope</Text>
					</Box>
					<ConnectionAuthDetails
						value={connection}
						onChange={setConnection}
					/>
					<Box mt={24}>
						<Text
							fz="xl"
							fw={600}
							c="bright"
						>
							Labels
						</Text>
						<Text>Add filtering labels to this connection</Text>
					</Box>
					<ConnectionLabelsDetails
						value={connection}
						onChange={setConnection}
					/>
					<Group mt={24}>
						<Link to={savepoint.path}>
							<Button
								color="obsidian"
								variant="light"
							>
								Back
							</Button>
						</Link>
						<Button
							type="submit"
							variant="gradient"
							disabled={!isValid}
							onClick={handleCreate}
						>
							Save & connect
						</Button>
					</Group>
				</Stack>
			</ScrollArea>
		</Box>
	);
}
