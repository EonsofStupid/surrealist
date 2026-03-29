import { Button, ButtonProps, createPolymorphicComponent } from "@mantine/core";
import clsx from "clsx";
import classes from "./style.module.scss";

interface BrutalistButtonProps extends ButtonProps {
	glow?: boolean;
}

export const BrutalistButton = createPolymorphicComponent<"button", BrutalistButtonProps>(({
	children,
	className,
	glow,
	...others
}) => {
	return (
		<Button
			{...others}
			className={clsx(
				classes.brutalistButton,
				glow && classes.glow,
				className
			)}
		>
			<span className={classes.label}>{children}</span>
		</Button>
	);
});
