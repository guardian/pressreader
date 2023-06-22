import { GuAlarm } from '@guardian/cdk/lib/constructs/cloudwatch/alarm';
import type { GuAlarmProps } from '@guardian/cdk/lib/constructs/cloudwatch/alarm';
import type { GuLambdaErrorPercentageMonitoringProps } from '@guardian/cdk/lib/constructs/cloudwatch/lambda-alarms';
import type { GuStack } from '@guardian/cdk/lib/constructs/core';
import type { GuScheduledLambda } from '@guardian/cdk/lib/patterns/scheduled-lambda';
import type { Duration } from 'aws-cdk-lib';
import {
	ComparisonOperator,
	MathExpression,
	TreatMissingData,
} from 'aws-cdk-lib/aws-cloudwatch';

interface GuScheduledLambdaErrorPercentageMonitoringProps
	extends GuLambdaErrorPercentageMonitoringProps {
	lengthOfEvaluationPeriod?: Duration;
	numberOfEvaluationPeriodsAboveThresholdBeforeAlarm?: number;
}

interface GuScheduledLambdaAlarmProps
	extends GuScheduledLambdaErrorPercentageMonitoringProps {
	lambda: GuScheduledLambda;
	lengthOfEvaluationPeriod?: Duration;
	numberOfEvaluationPeriodsAboveThresholdBeforeAlarm?: number;
}

/**
 * Creates an alarm which is triggered whenever the error percentage specified is exceeded
 * For scheduled lambdas we must take into account how often they are run in order to
 * choose when it is appropriate to trigger an alarm.
 */
export class GuScheduledLambdaErrorPercentageAlarm extends GuAlarm {
	constructor(scope: GuStack, id: string, props: GuScheduledLambdaAlarmProps) {
		const mathExpression = new MathExpression({
			expression: '100*m1/m2',
			usingMetrics: {
				m1: props.lambda.metricErrors(),
				m2: props.lambda.metricInvocations(),
			},
			label: `Error % of ${props.lambda.functionName}`,
			period: props.lengthOfEvaluationPeriod,
		});
		const defaultAlarmName = `High error % from ${props.lambda.functionName} lambda in ${scope.stage}`;
		const defaultDescription = `${props.lambda.functionName} exceeded ${props.toleratedErrorPercentage}% error rate`;
		const alarmProps: GuAlarmProps = {
			...props,
			app: props.lambda.app,
			metric: mathExpression,
			treatMissingData: TreatMissingData.NOT_BREACHING,
			threshold: props.toleratedErrorPercentage,
			comparisonOperator: ComparisonOperator.GREATER_THAN_THRESHOLD,
			evaluationPeriods:
				props.numberOfEvaluationPeriodsAboveThresholdBeforeAlarm ?? 1,
			alarmName: props.alarmName ?? defaultAlarmName,
			alarmDescription: props.alarmDescription ?? defaultDescription,
		};
		super(scope, id, alarmProps);
	}
}
