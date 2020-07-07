import *  as React from "react";
import { WidgetProps } from "@talentsoft-opensource/integration-widget-contract"
import '../asset/widget.less';
import Scrollbars from 'react-custom-scrollbars';
import { List, Line } from "./templates/List/List";
import { PieCharts } from "./templates/PieCharts/PieCharts";
import { Table, Value, Column } from "./templates/Table/Table";
import { ValueType } from "./templates/Table/ValueType";
import { Search } from "./components/Search/Search";
import { StatusAvailable } from "./components/Search/Status";
import { Expense } from "./Expense";

interface NormalWidgetProps {
    widgetProps: WidgetProps;
    isSearchVisible: boolean;
}

interface NormalWidgetState {
    data: Expense[];
    searchResult: Expense[];
    searchtextvalue: string;
}

export class NormalWidget extends React.Component<NormalWidgetProps, NormalWidgetState> {
    constructor(props: NormalWidgetProps) {
        super(props);
        this.state = {
            data:[],
            searchResult:[],
            searchtextvalue: ""
        }
    }
    
    componentDidMount() {
        this.getData().catch((r) => { this.props.widgetProps.myTSHostService.raiseError("could not load data", "ERR_SERVICE", r); });
    }

    public async getData() {
        const { myTSHostService } = this.props.widgetProps;

        myTSHostService.setDataIsLoading();

        const response = await myTSHostService.requestExternalResource({verb: 'GET', url: this.props.widgetProps.params["domain"] });

        if (response !== null) {
            if (response.status === 200) {
                const data = JSON.parse(response.body);
                const dataToSave = data as Expense[];
                this.setState({data: dataToSave});
                myTSHostService.setDataIsLoaded();
            }
            else {
                myTSHostService.raiseError("Service response error...", "ERR_SERVICE");
            }
        }
        else {
            myTSHostService.raiseError("couldn't retrieve data...", "ERR_SERVICE");
        }
    }
    
    handleChangeSearch(textToSearch: string, status: StatusAvailable[]) {
        let data = this.state.data;
        const availableStatus = status.map(stat => { if (stat.show) { return stat.value.toString(); } return ""; });

        if (textToSearch !== "" || availableStatus.indexOf("") > -1) {
            data = data.filter(function(item) {
                if (item.name.toLocaleUpperCase().search(textToSearch.toLocaleUpperCase()) === -1) {
                    return false;
                }
                if (availableStatus.indexOf(item.status.toString()) >= 0) {
                    return true;
                }
                return false;
            });
            this.setState({ searchResult: data, searchtextvalue: textToSearch });
        }
        else {
            this.setState({ data: data, searchtextvalue: textToSearch, searchResult: [] });
        }
    }

    getAllAvailableStatus() {
        let allStatus: StatusAvailable[] = this.state.data.map(item => {return ({value:item.status, show: true})});
        let allAvailableStatus: StatusAvailable[] = [];
        allStatus.filter(item => {
            if (allAvailableStatus.map(x => x.value.toString()).indexOf(item.value.toString()) <= -1) {
                allAvailableStatus.push(item);
            }
        });
        return allAvailableStatus;
    }
    
    formattedDataForList() {
        let items: Line[] = [];
        const dataToUse = this.state.searchtextvalue != "" || this.state.searchResult.length != 0 ? this.state.searchResult : this.state.data;

        if (dataToUse !== undefined && dataToUse.length !== 0) {
            dataToUse.map((line, index) => items.push({
                id: index, 
                urlPicture: '', 
                title: line.name, 
                subtitle: 'amount of expense ' + line.amount + " €", 
                description: line.description, 
                detail: line.status
            }));
        }
        return items;
    }
    
    formattedDataForPieChart() : (number | [number, number] | [string, number] | [string, number, number] | [number, number, number])[] {
        let items: Array<[string, number]> = new Array<[string, number]>();
        if (this.state.data !== undefined && this.state.data.length !== 0) {
            this.state.data.map(item => {
                items.push([item.name, item.amount])
            });
        }
        return items;
    }

    formattedDataForTable() {
        let items: Array<Value[]> = new Array<Value[]>();
        const dataToUse = this.state.searchtextvalue != "" || this.state.searchResult.length != 0 ? this.state.searchResult : this.state.data;

        if (this.state.data !== undefined && this.state.data.length !== 0) {
            dataToUse.map(item => {
                items.push(
                    [{type:ValueType.Tag, value: item.amount}, 
                    {type: ValueType.Text, value: item.name}, 
                    {type:ValueType.Date, value: item.date}, 
                    {type:ValueType.Status, value: item.status}]
                );
            });
        }
        return items;
    }

    formattedColumnsForTable() {
        let columns: Column[] = [];
        columns.push({name: 'Count', width: '20%'});
        columns.push({name: 'Expense', width: '40%'});
        columns.push({name: 'Date', width: '30%'});
        columns.push({name: 'Status', width: '10%'});

        return columns;
    }

    public render() {
        return (
            <div className="widget-template">
                <div className="content content-edm">
                    <div className="doc-container doc-01"> 
                        <div className="ico ico-pdf"></div>
                        <div className="doc">
                            <h2 className="doc-name">AL-Passeport.pdf</h2>
                            <div className="date">Créé le 11/09/2019 9:40 </div>
                        </div>
                    </div>

                    <div className="doc-container doc-02"> 
                        <div className="ico ico-pdf"></div>
                        <div className="doc">
                            <h2 className="doc-name">AL-Permis de conduire.pdf</h2>
                            <div className="date">Créé le 11/09/2019 9:40 </div>
                        </div>
                    </div>

                    <div className="doc-container doc-03"> 
                        <div className="ico ico-png"></div>
                        <div className="doc">
                            <h2 className="doc-name">AL-Photo identité.png</h2>
                            <div className="date">Créé le 11/09/2019 9:40 </div>
                        </div>
                    </div>

                    <div className="doc-container doc-04"> 
                        <div className="ico ico-pdf"></div>
                        <div className="doc">
                            <h2 className="doc-name">AL-RIB.pdf</h2>
                            <div className="date">Créé le 11/09/2019 9:40 </div>
                        </div>
                    </div>

                <div className="btn-container">
                    <div className="btn btn-generer"><a href="https://uat-hrrportalstd.neocasedemo.com/Default.aspx?pageId=1359">Générer document</a></div>
                    <div className="btn btn-transmettre"><a href="">Transmettre document</a></div>
                </div>

                </div>
            </div>
        );      
    }
}
