import { Stack } from "@mantine/core";
import { ComputeUsageChart } from "~/screens/Connectome/metrics/ComputeUsageChart";
import { MemoryUsageChart } from "~/screens/Connectome/metrics/MemoryUsageChart";
import { SharedMetricsPanelProps } from "..";

export function SystemPanel({
	instance,
	metricOptions,
	onCalculateMetricsNodes,
}: SharedMetricsPanelProps) {
	return (
		<Stack gap="xl">
			<ComputeUsageChart
				instance={instance}
				nodeFilter={metricOptions.nodeFilter}
				duration={metricOptions.duration}
				onCalculateMetricsNodes={onCalculateMetricsNodes}
			/>
			<MemoryUsageChart
				instance={instance}
				nodeFilter={metricOptions.nodeFilter}
				duration={metricOptions.duration}
				onCalculateMetricsNodes={onCalculateMetricsNodes}
			/>
		</Stack>
	);
}
