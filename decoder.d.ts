declare module '@beycandeveloper/tron-tx-decoder' {
    interface Transaction {
        raw_data: {
            contract: {
                parameter: {
                    value: {
                        data: string;
                        contract_address?: string;
                    };
                };
            }[];
        };
        ret: [{ contractRet: string }];
    }

    interface DecodedResult {
        methodName: string;
        outputNames: string[];
        outputTypes: string[];
        decodedOutput: any;
    }

    interface DecodedInput {
        methodName: string;
        inputNames: string[];
        inputTypes: string[];
        decodedInput: any;
    }

    interface RevertMessage {
        txStatus: string;
        revertMessage: string;
    }

    export default class TronTxDecoder {
        constructor(node: string);

        decodeResultById(transactionID: string): Promise<DecodedResult>;
        decodeInputById(transactionID: string): Promise<DecodedInput>;
        decodeRevertMessage(transactionID: string): Promise<RevertMessage>;
    }

    function _getTransaction(transactionID: string, tronNode: string): Promise<Transaction>;
    function _getHexEncodedResult(transactionID: string, tronNode: string): Promise<string>;
    function _getContractABI(contractAddress: string, tronNode: string): Promise<any[]>;
    function _extractInfoFromABI(data: string, abi: any[]): any;
    function _handleInputs(input: any): string;
    function _genMethodId(methodName: string, types: string[]): string;
}