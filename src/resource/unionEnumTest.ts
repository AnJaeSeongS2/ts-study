enum State {
    loading,
    failed,
    success,
}
type NetworkLoadingState = {
    state: State.loading;
}
type NetworkFailedState = {
    state: State.failed;
    code: number;
}

type NetworkSuccessState = {
    state: State.success;
    response: {
        title: string;
        duration: number;
    };
}

type NetworkState = 
    | NetworkLoadingState
    | NetworkFailedState
    | NetworkSuccessState;

function getNetworkCheckingMsg(state: NetworkState): string {
    switch (state.state) {
        case State.loading:
            return 'Downloading...'
        case State.failed:
            return `Error code:${state.code} on downloading.`
        case State.success:
            return `Success Download ${state.response.title} with ${state.response.duration}ms.`;

    }
}

export default {
    test: function() {
        const downloading: NetworkLoadingState = {
            state: State.loading
        }
        const downloadFailed: NetworkFailedState = {
            state: State.failed,
            code: 404
        }
        const downloadSuccess: NetworkSuccessState = {
            state: State.success,
            response: {
                title: 'x-file',
                duration: 5022
            }
        }
        console.log(getNetworkCheckingMsg(downloading))
        console.log(getNetworkCheckingMsg(downloadFailed))
        console.log(getNetworkCheckingMsg(downloadSuccess))
    }
}
    