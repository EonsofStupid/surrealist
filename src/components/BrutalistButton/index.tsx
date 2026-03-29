import { Button, ButtonProps, createPolymorphicComponent } from "@mantine/core";
import clsx from "clsx";
import classes from "./style.module.scss";

interface BrutalistButtonProps extends ButtonProps {
	glow?: boolean;
}

export const BrutalistButton = createPolymorphicComponent<"button", BrutalistButtonProps>((props: any) => {
	const { children, className, glow, ...others } = props;
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
